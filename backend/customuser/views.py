from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from django.contrib.auth import authenticate

# Create your views here.
@api_view(['PUT'])
def register_user(request):
    try:
        data = request.data
        if CustomUser.objects.filter(email=data['email']).exists():
            return Response({'message': 'Email already exists'}, status=status.HTTP_409_CONFLICT)
        
        if CustomUser.objects.filter(user_name=data['user_name']).exists():
            return Response({'message': 'Username already exists'}, status=status.HTTP_409_CONFLICT)
        
        if data['password'] != data['confirm_password']:
            return Response({'message': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = CustomUser.objects.create_user(
            email=data['email'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
        )
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(e)
        return Response({'message': "Something went wrong while creating user"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
