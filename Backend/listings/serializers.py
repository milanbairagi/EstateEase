from rest_framework import serializers
from .models import User, Amenity, Property, PropertyImage, Inquiry


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "phone_number"]
        extra_kwargs = {"password": {"write_only": True}}

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
