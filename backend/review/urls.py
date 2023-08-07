from django.urls import path,include
from . import views

urlpatterns=[
    path('create/<str:dishId>',views.create),
    path('getUserReview',views.getUserReview),
    path('delete/<str:dishId>',views.delete),
    path('update/<str:dishId>',views.update),
    path('getDishReview/<str:dishId>',views.getDishReview),
    
]