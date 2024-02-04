# myapp/serializers.py
from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    """
    Serializer for the Account model.
    """
    class Meta:
        model = Account
        fields = '__all__'
