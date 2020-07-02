from django.urls import path

from . import views

urlpatterns = [
  path('', views.login),
  path('callback/', views.authorize, name='authorize')
]
