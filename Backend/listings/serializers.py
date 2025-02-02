from rest_framework import serializers
from .models import User, Amenity, Property, PropertyImage, Inquiry
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "phone_number"]
        extra_kwargs = { 
            "id": {"read_only": True}
        }

    def create(self, validated_data):
        return User.objects.create(**validated_data)


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"
        extra_kwargs = {
            "owner": {
                "read_only": True
            },
        }

    def update(self, instance, validated_data):
        instance.updated_at = timezone.now()
        return super().update(instance, validated_data)


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at", "status"]
