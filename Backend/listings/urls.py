from django.urls import path
from .views import PropertyListCreate, PropertyRetrieveUpdateDestroy

urlpatterns = [
    path("properties/", PropertyListCreate.as_view(), name="properties"),
    path("property/<int:pk>/", PropertyRetrieveUpdateDestroy.as_view(), name="property-detail"),

]