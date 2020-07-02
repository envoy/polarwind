from django.shortcuts import redirect
from authlib.integrations.django_client import OAuth

oauth = OAuth()
oauth.register(
    name='envoy',
    client_kwargs={
        'scope': 'public'
    }
)


def login(request):
    redirect_uri = request.build_absolute_uri(reverse('authorize'))
    return oauth.envoy.authorize_redirect(request, redirect_uri)

def authorize(request):
    token = oauth.envoy.authorize_access_token(request)
    request.session['user'] = { "token": token }
    return redirect('/')
