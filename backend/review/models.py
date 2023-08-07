from django.db import models

class review(models.Model):
    class Suit(models.IntegerChoices):
        one = 1
        two = 2
        three = 3
        four = 4
        five= 5

    id=models.AutoField(primary_key=True)
    userId=models.CharField(max_length=20,unique=True)
    reviewId=models.CharField(max_length=50,unique=True)
    dishId=models.CharField(max_length=20,unique=True)
    rating=models.IntegerField(default=Suit.one,choices=Suit.choices)
    content=models.CharField(max_length=200)
    createdAt=models.DateTimeField(auto_now_add=True)
