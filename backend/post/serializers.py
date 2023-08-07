from rest_framework import serializers
from .models import post
class dishSerializer(serializers.ModelSerializer):
    class Meta:
        model=post
        fields=['userId','dishId','dishPhoto','dishName','dishBio','dishCuisine', 'dishTime','createdAt']