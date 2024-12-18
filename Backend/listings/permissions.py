from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    """
    return true if logged-in user is owner of the obj or 
    if user is accessing safe methods('GET', 'HEAD', 'OPTIONS')
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj.owner == request.user