from django.urls import path

from .views import create_task, get_user_tasks, get_task, update_task, delete_task

urlpatterns = [
    path('create/', create_task, name='create_task'),
    path('get', get_user_tasks, name='get_user_tasks'),
    path('get/<str:pk>/', get_task, name='get_task'),
    path('update/<str:pk>/', update_task, name='update_task'),
    path('delete/<str:pk>/', delete_task, name='delete_task'),
]