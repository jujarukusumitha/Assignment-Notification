from django.urls import path
from .views import (
    TriggerListCreateView, TriggerDetailView,
    TemplateListCreateView, TemplateDetailView,
    TemplateToggleView, TestSendView
)

urlpatterns = [
    # Triggers
    path('triggers/', TriggerListCreateView.as_view(), name='trigger-list'),
    path('triggers/<int:pk>/', TriggerDetailView.as_view(), name='trigger-detail'),

    # Templates
    path('templates/', TemplateListCreateView.as_view(), name='template-list'),
    path('templates/<int:pk>/', TemplateDetailView.as_view(), name='template-detail'),
    path('templates/<int:pk>/toggle/', TemplateToggleView.as_view(), name='template-toggle'),
    path('templates/<int:pk>/test/', TestSendView.as_view(), name='template-test'),
]