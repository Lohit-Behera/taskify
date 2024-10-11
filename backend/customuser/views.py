from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser
from .serializers import UserSerializer

# Create your views here.
@api_view(['POST'])
def register_user(request):
    try:
        data = request.data
        if (not data['username']) or (not data['email']) or (not data['password']) or (not data['confirmPassword']) or (not data['firstName']) or (not data['lastName']):
            return Response({'message': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_name = data['username'].lower()
        first_name = data['firstName'].lower().capitalize()
        last_name = data['lastName'].lower().capitalize()
        email = data['email'].lower()
        password = data['password']
        confirmPassword = data['confirmPassword']
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists'}, status=status.HTTP_409_CONFLICT)
        
        if CustomUser.objects.filter(user_name=user_name).exists():
            return Response({'message': 'Username already exists'}, status=status.HTTP_409_CONFLICT)
        
        if (len(password) < 8):
            return Response({'message': 'Password must be at least 8 characters long'}, status=status.HTTP_400_BAD_REQUEST)
        
        if password != confirmPassword:
            return Response({'message': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        
        user = CustomUser.objects.create_user(
            user_name=user_name,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.save()
        return Response({
            'message': 'User created successfully', 
            'data': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(e)
        return Response({'message': "Something went wrong while creating user"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login_user(request):
    try:
        data = request.data
        if (not data['email']) or (not data['password']):
            return Response({'message': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        auth_user = authenticate(request, email=data['email'], password=data['password'])
        if auth_user is None:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = CustomUser.objects.get(email=data['email'])
        serializers = UserSerializer(user)
        refresh = RefreshToken.for_user(auth_user)
        
        return Response({
            'message': 'Login successful',
            'data': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': serializers.data
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'message': "Something went wrong while logging in"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)