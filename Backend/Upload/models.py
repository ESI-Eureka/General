# Example Django model
from django.db import models

class UploadedFile(models.Model):
    """
    Represents an uploaded file.

    Attributes:
        file (FileField): The uploaded file.
        uploaded_at (DateTimeField): The date and time when the file was uploaded.
    """
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    