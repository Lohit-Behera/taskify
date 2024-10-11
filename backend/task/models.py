from django.db import models
from enum import Enum

class PriorityEnum(Enum):
    LOW = 'Low'
    MEDIUM = 'Medium'
    HIGH = 'High'

class StatusEnum(Enum):
    PENDING = 'Pending'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'

def get_enum_choices(enum_class):
    return [(tag, tag.value) for tag in enum_class]

class Task(models.Model):
    user = models.ForeignKey('customuser.CustomUser', on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField()
    priority = models.CharField(
        max_length=10,
        choices=get_enum_choices(PriorityEnum),
        default=PriorityEnum.LOW.value
    )
    status = models.CharField(
        max_length=15,
        choices=get_enum_choices(StatusEnum),
        default=StatusEnum.PENDING.value
    )
    due_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
