from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from excelsior.models import Articles
from .serializers import ArticleSerializer
from excelsior.models import Category
from .serializers import CategorySerializer
from rest_framework.pagination import PageNumberPagination

# Create your views here.


@api_view(['GET'])
def getData(request):
    articles = Articles.objects.all() 
    paginator = PageNumberPagination()   
    paginated_articles = paginator.paginate_queryset(articles, request)  
    serializer = ArticleSerializer(paginated_articles, many=True)
    return paginator.get_paginated_response(serializer.data)  

@api_view(['GET'])
def getLatest(request):
    articles = Articles.objects.all().prefetch_related('images', 'author', 'category')[:7]
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_articles_by_category(request):
    data = {}
    selected_categories = ['Local', 'Sport', 'Schools']

    parent_categories = Category.objects.filter(name__in=selected_categories, parent__isnull=True)
    
    for category in parent_categories:
   
        articles = Articles.objects.filter(category=category)[:7]
        data[category.name] = ArticleSerializer(articles, many=True).data

    return Response(data)

@api_view(['GET'])
def get_top_articles(request):
    articles = Articles.objects.all().prefetch_related('images', 'author', 'category').order_by('-views')[:10]

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_missed_articles(request):
    articles = Articles.objects.only('id', 'title', 'slug').order_by('views')[:4]

    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategoryData(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def increment_views(request, article_id):
    try:
        article = Articles.objects.get(pk=article_id)
        article.views += 1
        article.save()
        return Response({'message': 'View count updated successfully.'})
    except Articles.DoesNotExist:
        return Response({'error': 'Article not found.'}, status=404)
