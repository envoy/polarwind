# Sample Django project with Polarwind pre-installed

## Overview

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

## Development

### Setup

Set up Python dependencies

```
pipenv install
```

Set up JavaScript dependencies

```
yarn
```

### Running the project

Run the Django backend (defaults to port 4300)

```
pipenv run python manage.py runserver
```

Run React frontend (defaults to port 4301).

```
yarn start
```

In development, you don't need to use this
port directly. The frontend development server will be proxied by the Django app at port
4300 so that you get live reloading.
