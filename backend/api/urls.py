from django.urls import path
from . import views


urlpatterns = [
    path('', views.getData),
    path('articles/', views.getData),
    path('articles/latest', views.getLatest),
    path('articles/top', views.get_top_articles),
    path('articles-by-category/', views.get_articles_by_category),
    path('categories/', views.getCategoryData),
    path('increment_views', views.increment_views)
]
