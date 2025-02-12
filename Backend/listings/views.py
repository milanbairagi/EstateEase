from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import User, Property, Inquiry, Amenity
from .serializers import UserSerializer, PropertySerializer, PropertyDetailSerializer, PropertyListSerializer, InquirySerializer, AmenitySerializer
from .permissions import IsOwnerOrReadOnly
from .filters import PropertyFilter

class PropertyListCreate(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    # serializer_class = PropertySerializer
    permission_classes = [AllowAny]
    filterset_class = PropertyFilter

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PropertySerializer
        return PropertyListSerializer

    def create(self, request, *args, **kwargs):
        if not self.request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PropertyRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertyDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        if not self.request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return self.request.user


class InquiryListCreate(generics.ListCreateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        property_id = self.kwargs.get("pk")
        property = get_object_or_404(Property, pk=property_id)
        if user.is_authenticated:
            return Inquiry.objects.filter(property__owner=user)
        return Inquiry.objects.none()
    
    def create(self, request, *args, **kwargs):
        property_id = kwargs.get(self.lookup_field)
        new_data = {**(request.data), "property":property_id, "user":request.user.id}

        serializer = self.get_serializer(data=new_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserInquiryList(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        inquiries = Inquiry.objects.filter(property__owner=user)

        return inquiries


class AmenityList(generics.ListAPIView):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    permission_classes = [AllowAny]