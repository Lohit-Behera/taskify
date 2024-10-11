from rest_framework import serializers
from .models import Task, PriorityEnum, StatusEnum


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['priority'] = dict(PriorityEnum.__members__)[instance.priority].value
        representation['status'] = dict(StatusEnum.__members__)[instance.status].value
        return representation