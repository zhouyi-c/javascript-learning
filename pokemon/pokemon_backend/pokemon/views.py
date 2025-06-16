from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Pokemon, PokemonType, Favorite
from .serializers import (
    PokemonSerializer, PokemonTypeSerializer,
    FavoriteSerializer
)

class PokemonViewSet(viewsets.ReadOnlyModelViewSet):
    """宝可梦视图集"""
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['types__type__name']
    search_fields = ['name', 'name_en']
    ordering_fields = ['pokemon_id', 'name', 'height', 'weight']
    ordering = ['pokemon_id']

    @action(detail=True, methods=['post', 'delete'])
    def favorite(self, request, pk=None):
        pokemon = self.get_object()
        if request.method == 'POST':
            serializer = FavoriteSerializer(
                data={'pokemon_id': pokemon.pokemon_id},
                context={'request': request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == 'DELETE':
            Favorite.objects.filter(
                user=request.user,
                pokemon=pokemon
            ).delete()
            return Response(status=204)

class PokemonTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """宝可梦属性视图集"""
    queryset = PokemonType.objects.all()
    serializer_class = PokemonTypeSerializer

class FavoriteViewSet(viewsets.ModelViewSet):
    """收藏视图集"""
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 