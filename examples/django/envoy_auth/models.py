from django.contrib.auth.models import User
from django.db import models

class EnvoyToken(models.Model):
    user = models.OneToOneField(User, unique=True, null=False, blank=False, db_index=True, on_delete=models.CASCADE)
    envoy_user_id = models.IntegerField()
    envoy_company_id = models.IntegerField()
    jwt_scopes = models.CharField(max_length=250)
    token_type = models.CharField(max_length=50)
    access_token = models.CharField(max_length=1000)
    expires_at = models.DateTimeField(null=True)

