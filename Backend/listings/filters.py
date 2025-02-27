import django_filters
from .models import Property

class PropertyFilter(django_filters.FilterSet):
    property_type = django_filters.MultipleChoiceFilter(
        choices=Property.PROPERTIES_TYPES
    )

    class Meta:
        model = Property
        fields = {
            "title": ['exact', "contains"], 
            "owner": ["exact", ],
            "price": ["exact", "lt", "gt", "range"], 
            "city": ["exact", "contains"], 
            "district": ["exact", "contains"], 
            "bedroom": ["exact", "lt", "gt", "range"], 
            "bathroom": ["exact", "lt", "gt", "range"], 
            "is_featured": ["exact", ],
            "amenities": ["exact",],
            "area_sqft": ["exact", "lt", "gt", "range"],
        }