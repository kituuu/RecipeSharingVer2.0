from rest_framework import serializers
from .models import userProfile
class userProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=userProfile
        fields=['id','userId','profilePhoto','name','bio','emailId']