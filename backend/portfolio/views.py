from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Certificate, ContactMessage, Experience, HeroSection, Project, Skill, ThemeSettings
from .permissions import AdminOnly, AdminWriteOrReadOnly
from .serializers import (
    CertificateSerializer,
    ContactMessageSerializer,
    ExperienceSerializer,
    HeroSectionSerializer,
    ProjectSerializer,
    SkillSerializer,
    ThemeSettingsSerializer,
)


class HeroSectionViewSet(viewsets.ModelViewSet):
    queryset = HeroSection.objects.all()
    serializer_class = HeroSectionSerializer
    permission_classes = [AdminWriteOrReadOnly]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AdminWriteOrReadOnly]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AdminWriteOrReadOnly]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [AdminWriteOrReadOnly]


class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [AdminWriteOrReadOnly]


class ThemeSettingsViewSet(viewsets.ModelViewSet):
    queryset = ThemeSettings.objects.all()
    serializer_class = ThemeSettingsSerializer
    permission_classes = [AdminWriteOrReadOnly]

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def track_visit(self, request):
        theme = ThemeSettings.objects.first()
        if not theme:
            theme = ThemeSettings.objects.create()
        theme.total_visitors += 1
        theme.save(update_fields=['total_visitors', 'updated_at'])
        return Response({'total_visitors': theme.total_visitors})

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def track_resume_download(self, request):
        theme = ThemeSettings.objects.first()
        if not theme:
            theme = ThemeSettings.objects.create()
        theme.total_resume_downloads += 1
        theme.save(update_fields=['total_resume_downloads', 'updated_at'])
        return Response({'total_resume_downloads': theme.total_resume_downloads})


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [AdminOnly()]

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return ContactMessage.objects.all()
        return ContactMessage.objects.none()

    @action(detail=True, methods=['post'], permission_classes=[AdminOnly])
    def mark_read(self, request, pk=None):
        message = self.get_object()
        message.is_read = True
        message.save(update_fields=['is_read', 'updated_at'])
        return Response({'status': 'read'})


class DashboardStatsView(APIView):
    permission_classes = [AdminOnly]

    def get(self, request):
        theme = ThemeSettings.objects.first()
        return Response(
            {
                'projects': Project.objects.count(),
                'featured_projects': Project.objects.filter(featured=True).count(),
                'skills': Skill.objects.count(),
                'messages_total': ContactMessage.objects.count(),
                'messages_unread': ContactMessage.objects.filter(is_read=False).count(),
                'experience_items': Experience.objects.count(),
                'certificates': Certificate.objects.count(),
                'visitor_statistics': theme.total_visitors if theme else 0,
                'resume_downloads': theme.total_resume_downloads if theme else 0,
            },
            status=status.HTTP_200_OK,
        )
