# Sample Django project with Polarwind pre-installed

This project is an example of a Django project with Polarwind pre-installed. We are using
Create React App to serve up a typical React application, with Polarwind installed as a
dependency.

To build the React project for production, you would change into the `frontend` directory
and run `npm run build`. This will compile the files into the `frontend/build` directory,
including an `index.html` that will point to the latest bundle.

Over in the Django side, we serve up the contents of `frontend/build/index.html` for any
URL (with the exception of `admin/`).

This project also includes a Django middleware to authenticate the user session against
Envoy's OAuth endpoints.
