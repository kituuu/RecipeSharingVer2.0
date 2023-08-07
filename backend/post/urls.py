from django.urls import path,include
from . import views

urlpatterns=[
    path('create',views.create),
    path('getAllPost',views.getAllPost),
    path('delete/<str:dishId>',views.delete),
    path('update/<str:dishId>',views.update),
    path('getUserPost/<str:userId>',views.getUserPost),
    path('getUserLikedPost/<str:userId>', views.getUserLikedPost ),
    path('getPost/<str:id>',views.getPost)
]