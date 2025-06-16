from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'pokemon', views.PokemonViewSet)
router.register(r'types', views.PokemonTypeViewSet)
router.register(r'favorites', views.FavoriteViewSet, basename='favorite')

urlpatterns = [
    path('', include(router.urls)),
] 