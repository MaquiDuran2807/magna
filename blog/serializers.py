# serializers.py
from rest_framework import serializers
from .models import BlogPost, Comment, Category
from user.serializers import UserInforSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'image']

class CommentSerializer(serializers.ModelSerializer):
    author = UserInforSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source='image_blog', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    author = UserInforSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title','description' , 'content', 'date_posted', 'author', 'category', 'comments', 'important', 'image']

class AllBlogPostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source='image_blog', read_only=True)
    category = CategorySerializer(read_only=True)
    author = UserInforSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title','description' , 'date_posted', 'author', 'category', 'important', 'image']

class ImportantBlogPostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source='image_blog', read_only=True)
    category = CategorySerializer(read_only=True)
    author = UserInforSerializer(read_only=True)
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'date_posted', 'author', 'category','important', 'image']