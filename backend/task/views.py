from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from datetime import datetime

from .models import Task
from .serializers import TaskSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100
    
    def get_paginated_response(self, data):
        return Response({
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'has_next_page': self.page.has_next(),
            'results': data
        })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request):
    try:
        data = request.data
        user = request.user
        
        try:
            title = data['title']
            description = data['description']
            priority = data['priority']
            task_status = data['status']
            due_date = data['dueDate'] 
        except:
            return Response({'message': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        iso_date = due_date
        formatted_date = datetime.strptime(iso_date, "%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
        
        print(priority, type(priority), task_status, type(task_status))

        
        task = Task.objects.create(
            user=user,
            title=title,
            description=description,
            due_date=formatted_date,
            priority=priority,
            status=task_status
        )
        
        serializer = TaskSerializer(task, many=False)
        return Response({'message': 'Task created successfully', 'task': serializer.data}, status=status.HTTP_200_OK)

    except Exception as e:
        print(e)
        return Response({'message': 'Something went wrong while creating task'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request):
    try:
        tasks = Task.objects.filter(user=request.user).order_by('-created_at')
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(tasks, request)
        serializer = TaskSerializer(result_page, many=True)
        response_data = {
                    'message': 'Tasks fetched successfully',
                    'total_pages': paginator.page.paginator.num_pages,
                    'current_page': paginator.page.number,
                    'has_next_page': paginator.page.has_next(),
                    'tasks': serializer.data
                }
        return Response(response_data)
    except Exception as e:
        print(e)
        return Response({'message': 'Something went wrong while fetching tasks'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)