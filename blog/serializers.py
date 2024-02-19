# serializers.py
from rest_framework import serializers
from .models import BlogPost, Comment, Category
from user.serializers import UserInforSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author = UserInforSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    author = UserInforSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title','description' , 'content', 'date_posted', 'author', 'category', 'comments', 'image', 'important']

class AllBlogPostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = UserInforSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = ['id', 'title','description' , 'date_posted', 'author', 'category', 'image', 'important']

class ImportantBlogPostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    author = UserInforSerializer(read_only=True)
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'date_posted', 'author', 'category','important']