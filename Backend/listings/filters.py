import django_filters
from .models import Property

class PropertyFilter(django_filters.FilterSet):
    class Meta:
        model = Property
        fields = {
        "title": ['exact', "contains"], 
        "owner": ["exact", ],
        "property_type": ["exact"],
        "price": ["exact", "lt", "gt", "range"], 
        "city": ["exact", "contains"], 
        "district": ["exact", "contains"], 
        "bedroom": ["exact", "lt", "gt", "range"], 
        "bathroom": ["exact", "lt", "gt", "range"], 
        "is_featured": ["exact", ],
    }