from django.urls import path,include
from . import views

urlpatterns=[
    path('getStatus/<str:dishId>',views.getStatus),
    path('getLikeStatus/<str:Id>',views.getLikeStatus),
    path('onClick/<str:Id>',views.onClick)
    
    
]