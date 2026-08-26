from rest_framework.routers import DefaultRouter

from .views import ConseilViewSet

router = DefaultRouter()
router.register("conseils", ConseilViewSet, basename="conseil")

urlpatterns = router.urls
