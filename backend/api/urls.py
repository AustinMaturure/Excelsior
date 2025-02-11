from django.urls import path
from . import views


urlpatterns = [
    path('articles/', views.getData),
    path('articles/article/<slug:slug>/', views.getArticle),
    path('articles/snippets/<slug:slug>/', views.getSnippets),
    path('articles/latest', views.getLatest),
    path('articles/top-articles/', views.get_top_articles),
    path('articles/missed-articles/', views.get_missed_articles),
    path('articles-by-category/', views.get_articles_by_category),
    path('categories/<str:category>', views.get_category),
    path('increment_views', views.increment_views)
]
