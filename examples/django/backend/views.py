from django.views.generic.base import TemplateView
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden


@login_required
def home_view(request):
    obj = {
        'id': 'dashboard_id',
        'company_id': 1
    }

    # Object-level permission
    if not request.user.has_perm('IsInCompany', obj=obj):
        # Returns a 403 but does not redirect to /auth
        return HttpResponseForbidden()

    context = {
        # set any other context for the react app here like the root component to use (defaults to App)
        'component': 'App',

        # and any dynamic props to set on the component
        'props': {}
    }

    return render(request, "home.html", context = context)
