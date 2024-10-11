from django.urls import path

from .views import create_task, get_tasks

urlpatterns = [
    path('create/', create_task, name='create_task'),
    path('get/', get_tasks, name='get_tasks'),
]