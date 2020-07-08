from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login as django_login
from authlib.integrations.django_client import OAuth
from django.conf import settings

host = getattr(settings, 'ENVOY_HOST', 'envoy.com')
oauth = OAuth()
oauth.register(
    name='envoy',
    access_token_url=f'https://app.{host}/a/auth/v0/token',
    authorize_url=f'https://dashboard.{host}/a/auth/v0/authorize',
    client_kwargs={
        'scope': 'public'
    }
)


def login(request):
    redirect_uri = request.build_absolute_uri(reverse('authorize'))
    return oauth.envoy.authorize_redirect(request, redirect_uri)


def authorize(request):
    token = oauth.envoy.authorize_access_token(request)
    user = authenticate(remote_user=token)
    if user is not None:
        django_login(request, user)
        return redirect('/')
