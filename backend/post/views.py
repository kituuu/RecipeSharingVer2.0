from rest_framework.decorators import api_view
from rest_framework.response import Response

from likes.serializers import likeSerializer

from .serializers import dishSerializer
from rest_framework import status
from .models import post
from likes.models import likes
from django.shortcuts import get_object_or_404

from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUserPost(request,userId):
   try: 
     items=post.objects.filter(userId=userId)
    #  if items is None:
    #         response_data={"response":"this dish not exist"}
    #         return Response(response_data,status=status.HTTP_400_BAD_REQUEST)
     item_data=dishSerializer(items,many=True).data
     return Response({'message':item_data},status=status.HTTP_200_OK)
   except Exception as e:
       print(e)
       return Response({'message':'some error occured'},status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
# @authentication_classes([SessionAuthentication,TokenAuthentication])
# @permission_classes([IsAuthenticated])
def getAllPost(request):
    try:
        items=post.objects.all()
        
        items_data=dishSerializer(items,many=True).data
        # print(f"item data {items_data}")
        response_data={'message':items_data}
        # print(f"response data {response_data}")
        return Response(response_data,status=status.HTTP_200_OK)
       
    except Exception as e:
        print(e)
        response_data = {"message":"Some error occured"}
        return Response(response_data,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def update(request,dishId):
    try:
        userId=request.user.username
        dishName=request.data['dishName']
        dishPhoto=request.data['dishPhoto']
        dishId=dishId
        dishBio=request.data['dishBio']
        dishCusine=request.data['dishCusine']
        dishTime = request.data['dishTime']
        item=post.objects.filter(dishId=dishId).first()
        if item is None or userId!=item.userId:
            return Response({'message':'Some error occured'},status=status.HTTP_404_NOT_FOUND)
        item.dishName=dishName
        item.dishPhoto=dishPhoto
        item.dishBio=request.data['dishBio']
        item.dishCuisine=request.data['dishCusine']
        item.dishTime = request.data['dishTime']
        item.save()
        item_data=dishSerializer(item).data
        return Response({'message':item_data},status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message':'some error occured'},status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def create(request):
    try:
        userId=request.user.username
        dishName=request.data['dishName']
        dishPhoto=request.data['dishPhoto']
        dishBio=request.data['dishBio']
        dishCuisine=request.data['dishCuisine']
        dishTime = request.data['dishTime']
        item=post.objects.filter(dishName = dishName).first()
        if item :
            return Response({'message':'this dish already exists'},status=status.HTTP_400_BAD_REQUEST)
        
        post.objects.create(userId=userId,dishName=dishName,dishPhoto=dishPhoto,dishBio=dishBio,dishCuisine=dishCuisine )
        return Response({'message':'dish posted successfully', },status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        return Response({'message':'some error occured' , },status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete(request,dishId):
    try:
        userId=request.user.username
        
        item=post.objects.filter(dishId=dishId).first()
        if not item or userId!=item.userId:
            return Response({'message':'Some error occured'},status=status.HTTP_404_NOT_FOUND)
       
        item.delete()
        
        return Response({'message':'deleted successfully'},status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message':'some error occured'},status=status.HTTP_200_OK)

@api_view(['GET'])
# @authentication_classes([SessionAuthentication,TokenAuthentication])
# @permission_classes([IsAuthenticated])
def getPost(request , id):
    try: 
     
     item=post.objects.filter(dishId=id).first()
     print(item,'hello')
     if not item:
            response_data={"response":"this dish not exist"}
            return Response(response_data,status=status.HTTP_400_BAD_REQUEST)
    
     item_data=dishSerializer(item).data
     print(item_data)
     return Response({'message':item_data},status=status.HTTP_200_OK)
    except Exception as e:
       print(e)
       return Response({'message':'some error occured'},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUserLikedPost(request,userId):
   try: 
     items=likes.objects.filter(userId=userId)
    #  if items is None:
    #         response_data={"response":"this dish not exist"}
    #         return Response(response_data,status=status.HTTP_400_BAD_REQUEST)
     item_data=likeSerializer(items,many=True).data
     return Response({'message':item_data},status=status.HTTP_200_OK)
   except Exception as e:
       print(e)
       return Response({'message':'some error occured'},status=status.HTTP_400_BAD_REQUEST)