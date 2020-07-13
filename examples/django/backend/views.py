from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import jwt
# from django.views.generic.base import TemplateView

@login_required
def home_view(request):
    # context = super().get_context_data(**kwargs)
    context = {}
    context["component"] = "App"
    context["props"] = { "foo": "bar" }


    JWT_PUBLIC_KEY = """
    -----BEGIN PUBLIC KEY-----
    MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAExz0RpzznxVfhDJGEDVWVBZ5sT4uJDHLT
    6Al27gpfLgpvZ6fFjuTKXRDGbdcJYwUXfr+aZMUU92chRtgPAYRM4sTLzWQ3uL5o
    Fns98matgg8uQ5ZEnmEocNAppU09P37m
    -----END PUBLIC KEY-----
    """


    token = request.user.get_username()
    jwt.decode()
    return render(request, 'home.html', context)

# class HomeView(TemplateView):

#     template_name = "home.html"

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         # set any other context for the react app here like the root component to use
#         # context["component"] = "Foo" (defaults to "App")

#         # and any dynamic props to set on the component
#         # context["props"] = { "foo": "bar" }
#         return context
