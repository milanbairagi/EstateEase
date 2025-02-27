from rest_framework import serializers
from .models import User, Amenity, Property, PropertyImage, Inquiry
from django.utils import timezone


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email","first_name", "last_name", "phone_number", "password", "profile_image"]
        extra_kwargs = {
            "password": {"write_only": True},
            "id": {"read_only": True},
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


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["id", "name", "description", "icon",]


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "property", "image", "uploaded_at"]


class PropertyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "title", "image", "property_type", "price", "location", "city", "bedroom", "bathroom", 
                    "is_featured", "area_sqft",
                ]


class PropertyDetailSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True)
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Property
        fields = ["id", "owner", "title", "description", "price", "location", "city", "district", "latitude", 
                    "longitude", "bedroom", "bathroom", "amenities", "area_sqft", "is_featured", "image", 
                    "additional_images", "is_active", "updated_at",
                ]
        depth = 1

# For post/put/patch methods
class PropertySerializer(serializers.ModelSerializer):
    additional_images = PropertyImageSerializer(many=True, read_only=True)
    class Meta:
        model = Property
        fields = "__all__"
        extra_kwargs = {
            "owner": {
                "read_only": True
            },
        }

    def create(self, validated_data):
        amenities_data = validated_data.pop("amenities", [])
        new_property = Property.objects.create(**validated_data)
        new_property.amenities.set(amenities_data)
        return new_property


    def update(self, instance, validated_data):
        instance.updated_at = timezone.now()
        return super().update(instance, validated_data)


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at", "status"]

