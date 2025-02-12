from django.urls import path
from .views import PropertyListCreate, PropertyRetrieveUpdateDestroy, InquiryListCreate, UserRetrieveUpdateDestroy, UserInquiryList, AmenityList

urlpatterns = [
    path("user/", UserRetrieveUpdateDestroy.as_view(), name="user"),
    path("properties/", PropertyListCreate.as_view(), name="properties"),
    path("property/<int:pk>/", PropertyRetrieveUpdateDestroy.as_view(), name="property-detail"),
    path("property/<int:pk>/inquiries/", InquiryListCreate.as_view(), name="property-inquiries"),
    path("user/inquiries/", UserInquiryList.as_view(), name="user-inquiries"),
    path("amenities/",  AmenityList.as_view(), name="amenities"),
]