from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from userProfile.models import userProfile

from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def login(request):
    user=get_object_or_404(User,username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail":"Not found."},status=status.HTTP_404_NOT_FOUND)
    token,created=Token.objects.get_or_create(user=user)
    serializer=UserSerializer(instance=user)
    return Response({"token":token.key,"user":serializer.data})

@api_view(['POST'])
def signup(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user=User.objects.get(username=request.data['username'])
        except:
            print("fuck")
            serializer.save()
            user=User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token=Token.objects.create(user=user)
            userId = request.data['username']
            user_0 = userProfile(userId=userId,name="",profilePhoto="pics/blank-profile-picture.png",emailId="",bio="")
            user_0.save()
            return Response({"token":token.key,"user":serializer.data})
    return Response("err",status=301)
    

@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    print({request.user.username})
    print(Response({request.user.username}))
    return Response({request.user.username})
