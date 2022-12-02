from django.urls import path
from . import views
# from .views import api_home


urlpatterns = [
    path('predict', views.predict_api),
]