from django.db import models

# Create your models here.
class userProfile(models.Model):
    id=models.AutoField(primary_key=True)
    userId=models.CharField(max_length=20,unique=True)
    profilePhoto = models.ImageField(upload_to='pics' , default="pics/blank-profile-picture.png")
    name=models.CharField(max_length=20)
    bio=models.CharField(max_length=500)
    emailId=models.CharField(max_length=50)

