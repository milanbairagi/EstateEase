from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from listings.views import UserCreate
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/register/", UserCreate.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("api/", include("listings.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
