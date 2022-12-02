from django.urls import path
from . import views
# from .views import api_home


urlpatterns = [
    path('train', views.train_api),
]