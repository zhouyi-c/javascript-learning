from django.db import models
from django.contrib.auth.models import User

class Pokemon(models.Model):
    """宝可梦基本信息模型"""
    pokemon_id = models.IntegerField(unique=True, verbose_name="宝可梦编号")
    name = models.CharField(max_length=100, verbose_name="名称")
    name_en = models.CharField(max_length=100, verbose_name="英文名")
    height = models.FloatField(verbose_name="身高(m)")
    weight = models.FloatField(verbose_name="体重(kg)")
    image_url = models.URLField(verbose_name="图片URL")
    description = models.TextField(verbose_name="描述")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "宝可梦"
        verbose_name_plural = verbose_name
        ordering = ['pokemon_id']

    def __str__(self):
        return f"{self.pokemon_id} - {self.name}"

class PokemonType(models.Model):
    """宝可梦属性模型"""
    name = models.CharField(max_length=50, unique=True, verbose_name="属性名称")
    color = models.CharField(max_length=7, verbose_name="属性颜色")

    class Meta:
        verbose_name = "属性"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class PokemonTypeRelation(models.Model):
    """宝可梦与属性的关联模型"""
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE, related_name='types')
    type = models.ForeignKey(PokemonType, on_delete=models.CASCADE)
    slot = models.IntegerField(verbose_name="属性槽位")

    class Meta:
        verbose_name = "宝可梦属性关系"
        verbose_name_plural = verbose_name
        unique_together = ['pokemon', 'slot']

class Favorite(models.Model):
    """用户收藏模型"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE, related_name='favorited_by')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="收藏时间")

    class Meta:
        verbose_name = "收藏"
        verbose_name_plural = verbose_name
        unique_together = ['user', 'pokemon']

    def __str__(self):
        return f"{self.user.username} 收藏了 {self.pokemon.name}" 