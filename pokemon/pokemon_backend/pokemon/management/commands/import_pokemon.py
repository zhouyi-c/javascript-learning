import requests
from django.core.management.base import BaseCommand
from django.db import transaction
from pokemon.models import Pokemon, PokemonType, PokemonTypeRelation

class Command(BaseCommand):
    help = '从PokeAPI导入宝可梦数据'

    # 添加属性颜色映射
    TYPE_COLORS = {
        'normal': '#A8A878',
        'fire': '#F08030',
        'water': '#6890F0',
        'electric': '#F8D030',
        'grass': '#78C850',
        'ice': '#98D8D8',
        'fighting': '#C03028',
        'poison': '#A040A0',
        'ground': '#E0C068',
        'flying': '#A890F0',
        'psychic': '#F85888',
        'bug': '#A8B820',
        'rock': '#B8A038',
        'ghost': '#705898',
        'dragon': '#7038F8',
        'dark': '#705848',
        'steel': '#B8B8D0',
        'fairy': '#EE99AC'
    }

    # 默认图片URL
    DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'

    def add_arguments(self, parser):
        parser.add_argument(
            '--limit',
            type=int,
            default=151,
            help='要导入的宝可梦数量'
        )

    def get_pokemon_name(self, species_data):
        """获取宝可梦的中文名称"""
        for name in species_data.get('names', []):
            if name['language']['name'] == 'zh-Hans':
                return name['name']
        return species_data['name']  # 如果没有中文名，返回英文名

    def get_pokemon_image(self, pokemon_detail):
        """获取宝可梦的图片URL"""
        # 尝试获取默认图片
        image_url = pokemon_detail.get('sprites', {}).get('front_default')
        if not image_url:
            # 尝试获取其他版本的图片
            sprites = pokemon_detail.get('sprites', {})
            for key in ['front_shiny', 'back_default', 'back_shiny']:
                if sprites.get(key):
                    image_url = sprites[key]
                    break
        return image_url or self.DEFAULT_IMAGE_URL

    def handle(self, *args, **options):
        limit = options['limit']
        base_url = 'https://pokeapi.co/api/v2'
        
        # 获取所有属性数据
        self.stdout.write('正在获取属性数据...')
        types_response = requests.get(f'{base_url}/type')
        types_data = types_response.json()
        
        # 创建属性
        type_map = {}
        for type_data in types_data['results']:
            type_detail = requests.get(type_data['url']).json()
            type_name = type_detail['name']
            # 使用预定义的颜色映射
            color = self.TYPE_COLORS.get(type_name, '#777777')  # 默认灰色
            type_obj, created = PokemonType.objects.get_or_create(
                name=type_name,
                defaults={'color': color}
            )
            type_map[type_name] = type_obj
            if created:
                self.stdout.write(f'创建属性: {type_obj.name}')

        # 获取宝可梦数据
        self.stdout.write(f'开始导入宝可梦数据 (限制: {limit})...')
        pokemon_list = requests.get(f'{base_url}/pokemon?limit={limit}').json()

        with transaction.atomic():
            for pokemon_data in pokemon_list['results']:
                try:
                    pokemon_detail = requests.get(pokemon_data['url']).json()
                    
                    # 获取宝可梦描述和名称
                    species_url = pokemon_detail['species']['url']
                    species_data = requests.get(species_url).json()
                    
                    # 获取描述
                    description = next(
                        (entry['flavor_text'] for entry in species_data['flavor_text_entries']
                         if entry['language']['name'] == 'zh-hans'),
                        next(
                            (entry['flavor_text'] for entry in species_data['flavor_text_entries']
                             if entry['language']['name'] == 'en'),
                            '暂无描述'
                        )
                    )

                    # 获取名称
                    name = self.get_pokemon_name(species_data)

                    # 获取图片URL
                    image_url = self.get_pokemon_image(pokemon_detail)

                    # 创建宝可梦
                    pokemon, created = Pokemon.objects.get_or_create(
                        pokemon_id=pokemon_detail['id'],
                        defaults={
                            'name': name,
                            'name_en': pokemon_detail['name'],
                            'height': pokemon_detail['height'] / 10,  # 转换为米
                            'weight': pokemon_detail['weight'] / 10,  # 转换为千克
                            'image_url': image_url,
                            'description': description
                        }
                    )

                    if created:
                        self.stdout.write(f'创建宝可梦: {pokemon.name}')
                        
                        # 添加属性关系
                        for slot, type_data in enumerate(pokemon_detail['types'], 1):
                            type_name = type_data['type']['name']
                            PokemonTypeRelation.objects.create(
                                pokemon=pokemon,
                                type=type_map[type_name],
                                slot=slot
                            )
                    else:
                        self.stdout.write(f'宝可梦已存在: {pokemon.name}')

                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'处理宝可梦 {pokemon_data["name"]} 时出错: {str(e)}'))
                    continue

        self.stdout.write(self.style.SUCCESS(f'成功导入宝可梦数据！')) 