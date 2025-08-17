from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

from cloudinary_storage.storage import MediaCloudinaryStorage

DEFAULT_FILE_STORAGE = MediaCloudinaryStorage

class User(AbstractUser):
    profile_image = models.ImageField(upload_to="Profile Images", null=True, blank=True, storage=DEFAULT_FILE_STORAGE)
    phone_number = models.CharField(max_length=15, unique=True, null=True)
    email = models.EmailField(unique=True)

    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    object = CustomUserManager()


class Amenity(models.Model):
    name = models.CharField(max_length=100, unique=True, help_text="Name of the amenity (e.g., Parking, Swimming Pool)")
    description = models.TextField(null=True, blank=True, help_text="Optional description of the amenity")
    icon = models.ImageField(
            upload_to='amenity_icons/',
            null=True,
            blank=True,
            help_text="Optional icon/image for the amenity",
            storage=DEFAULT_FILE_STORAGE,
        )

    def __str__(self):
        return self.name


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
    amenities = models.ManyToManyField(Amenity, blank=True, related_name="properties")
    area_sqft = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_featured = models.BooleanField(default=False)

    # Images
    image = models.ImageField(upload_to="property_images/", null=True, blank=True, storage=DEFAULT_FILE_STORAGE)
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
    image = models.ImageField(upload_to="property_images/", 
                              storage=DEFAULT_FILE_STORAGE
                              )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.property.title}"


class Inquiry(models.Model):
    # Linking to the property and the user making the inquiry
    property = models.ForeignKey('Property', on_delete=models.CASCADE, related_name='inquiries')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='inquiries')  # The user making the inquiry

    # Inquiry details
    message = models.TextField()
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15, null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Inquiry status
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('answered', 'Answered'),
        ('closed', 'Closed'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    class Meta:
        verbose_name_plural = "Inquiries"

    def __str__(self):
        return f"Inquiry by {self.user.username} on {self.property.title}"