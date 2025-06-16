from django.contrib import admin
from .models import Pokemon, PokemonType, PokemonTypeRelation, Favorite

@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ('pokemon_id', 'name', 'name_en', 'height', 'weight')
    search_fields = ('name', 'name_en')
    list_filter = ('types__type__name',)
    ordering = ('pokemon_id',)

@admin.register(PokemonType)
class PokemonTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'color')
    search_fields = ('name',)

@admin.register(PokemonTypeRelation)
class PokemonTypeRelationAdmin(admin.ModelAdmin):
    list_display = ('pokemon', 'type', 'slot')
    list_filter = ('type',)
    search_fields = ('pokemon__name', 'type__name')

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'pokemon', 'created_at')
    list_filter = ('user', 'created_at')
    search_fields = ('user__username', 'pokemon__name')
    ordering = ('-created_at',) 