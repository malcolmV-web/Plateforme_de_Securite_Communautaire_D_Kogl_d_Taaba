from rest_framework.routers import DefaultRouter

from .views import PointAccueilViewSet

router = DefaultRouter()
router.register("points-accueil", PointAccueilViewSet, basename="point-accueil")

urlpatterns = router.urls
