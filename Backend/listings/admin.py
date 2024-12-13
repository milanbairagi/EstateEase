from django.contrib import admin
from .models import User, Amenity, Property, PropertyImage, Inquiry

admin.site.register(User)
admin.site.register(Property)
admin.site.register(PropertyImage)
admin.site.register(Inquiry)
admin.site.register(Amenity)