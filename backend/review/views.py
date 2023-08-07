from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import reviewSerializer
from rest_framework import status
from .models import review
from django.shortcuts import get_object_or_404

from rest_framework.decorators import authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUserReview(request):
   try: 
     userId=request.user.username
     items=review.objects.filter(userId=userId)
   
     item_data=reviewSerializer(items,many=True).data
     return Response({'message':item_data},status=status.HTTP_200_OK)
   except Exception as e:
       print(e)
       return Response({'message':'some error occured'},status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def getDishReview(request,dishId):
    try:
        items=review.objects.filter(dishId=dishId)
        
        items_data=reviewSerializer(items,many=True).data
        
        response_data={'message':items_data}
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
        reviewId=userId+dishId
        content=request.data['content']
        rating=request.data['rating']
        item=review.objects.filter(reviewId=reviewId).first()
        if item is None or userId!=item.userId:
            return Response({'message':'Some error occured'},status=status.HTTP_404_NOT_FOUND)
        item.content=content
        item.rating=rating
        
        item.save()
        item_data=reviewSerializer(item).data
        return Response({'message':item_data},status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message':'some error occured'},status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def create(request,dishId):
    try:
        userId=request.user.username

        dishId=dishId
        reviewId=userId+dishId
        content=request.data['content']
        rating=request.data['rating']
        item=review.objects.filter(reviewId=reviewId).first()
        if item :
            return Response({'message':'this review already exists'},status=status.HTTP_400_BAD_REQUEST)
        
        review.objects.create(userId=userId,dishId=dishId,content=content,rating=rating,reviewId=reviewId)
        return Response({'message':'dish posted successfully'},status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        return Response({'message':'some error occured'},status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete(request,dishId):
    try:
        userId=request.user.username
        reviewId=userId+dishId
        item=review.objects.filter(reviewId=reviewId).first()
        if not item or userId!=item.userId:
            return Response({'message':'Some error occured'},status=status.HTTP_404_NOT_FOUND)
       
        item.delete()
        
        return Response({'message':'deleted successfully'},status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message':'some error occured'},status=status.HTTP_200_OK)

