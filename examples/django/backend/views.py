from django.views.generic.base import TemplateView

class HomeView(TemplateView):

    template_name = "home.html"

    def get_context_data(self, **kwargs):
            context = super().get_context_data(**kwargs)
            # set any other context for the react app here like the root component to use
            # context["component"] = "Foo" (defaults to "App")

            # and any dynamic props to set on the component
            # context["props"] = { "foo": "bar" }
            return context
