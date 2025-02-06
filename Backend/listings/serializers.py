from rest_framework import serializers
from .models import User, Amenity, Property, PropertyImage, Inquiry
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username","first_name", "last_name", "email", "phone_number", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def update(self, instance, validated_data):
        # TODO: MAKE LOGIC TO UPDATE PASSWORD
        # prevent user to change password (FOR NOW)
        password = validated_data.pop("password", None)
        self.validated_data.pop("password", None)
        
        return super().update(instance, validated_data)

    def save(self, **kwargs):
        user = super().save(**kwargs)

        if "password" in self.validated_data:
            user.set_password(self.validated_data["password"])
            user.save()
        return user

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
