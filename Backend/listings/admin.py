from django.contrib import admin
from .models import User, Property, PropertyImage

admin.site.register(User)
admin.site.register(Property)
admin.site.register(PropertyImage)