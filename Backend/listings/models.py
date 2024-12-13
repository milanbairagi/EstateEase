from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass


class Property(models.Model):
    PROPERTIES_TYPES = [
        ("sale", "For Sale"),
        ("rent", "For Rent"),
    ]

    # ownership type
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="properties")
    title = models.CharField(max_length=20)
    description = models.TextField()
    property_type = models.CharField(max_length=10, choices=PROPERTIES_TYPES, default="sale")
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    # additional details
    bedroom = models.IntegerField(default=0)
    bathroom = models.IntegerField(default=0)
    area_sqft = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_featured = models.BooleanField(default=False)

    # Images
    image = models.ImageField(upload_to="property_images/", null=True, blank=True)
    additional_images = models.ManyToManyField("PropertyImage", blank=True, related_name="additional_properties")

    # status
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Properties"
        ordering = ['-created_at']

    def __str__(self):
        return self.title



class PropertyImage(models.Model):
    property = models.ForeignKey("Property", on_delete=models.CASCADE, related_name="property_images")
    image = models.ImageField(upload_to="property_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.property.title}"