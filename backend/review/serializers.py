from rest_framework import serializers
from .models import review
class reviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=review
        fields=['id','userId','content','rating','dishId','createdAt','reviewId']