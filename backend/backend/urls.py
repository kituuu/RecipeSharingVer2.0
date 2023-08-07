from django.contrib import admin
from django.urls import path
from django.urls import include,path
from django.conf import settings
from django.conf.urls.static import static 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('auth.urls')),
    path('userProfile/',include('userProfile.urls')),
    path('post/',include('post.urls')),
    path('review/',include('review.urls')),
    path('likes/',include('likes.urls'))

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
