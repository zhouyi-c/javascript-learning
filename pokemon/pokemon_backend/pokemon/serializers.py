from rest_framework import serializers
from .models import Pokemon, PokemonType, PokemonTypeRelation, Favorite

class PokemonTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonType
        fields = ['id', 'name', 'color']

class PokemonTypeRelationSerializer(serializers.ModelSerializer):
    type = PokemonTypeSerializer()

    class Meta:
        model = PokemonTypeRelation
        fields = ['type', 'slot']

class PokemonSerializer(serializers.ModelSerializer):
    types = PokemonTypeRelationSerializer(many=True, read_only=True)
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Pokemon
        fields = [
            'pokemon_id', 'name', 'name_en', 'height', 'weight',
            'image_url', 'description', 'types', 'is_favorite'
        ]

    def get_is_favorite(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Favorite.objects.filter(user=request.user, pokemon=obj).exists()
        return False

class FavoriteSerializer(serializers.ModelSerializer):
    pokemon = PokemonSerializer(read_only=True)
    pokemon_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Favorite
        fields = ['id', 'pokemon', 'pokemon_id', 'created_at']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        user = self.context['request'].user
        pokemon_id = validated_data.pop('pokemon_id')
        pokemon = Pokemon.objects.get(pokemon_id=pokemon_id)
        favorite, created = Favorite.objects.get_or_create(
            user=user,
            pokemon=pokemon
        )
        return favorite 