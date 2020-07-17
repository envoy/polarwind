# Sample Django project with Polarwind pre-installed

## Overview

This project is an example of a Django project with Polarwind pre-installed. We are using
Create React App's development server to serve up the bundled JS and CSS, while keeping
the template itself in Django. This allows a more natural way of building pages in Django
using paths, views and templates.

To build the React project for production, your deployment process should run `npm run build` in the `frontend` directory.

This project also includes a Django app called `envoy_auth` that implements OAuth2
authentication with Envoy's OAuth endpoints. The root path (which serves the Django React
template) is protected with `login_required` from `django.contrib.auth`.

## Development

### Setup

Install direnv

```
brew install direnv
```

Set up Python dependencies

```
pipenv install
```

Set up JavaScript dependencies

```
npm install
```

### Running the project

Run React frontend first

```
cd frontend
npm start
```

Then run the Django backend (defaults to port 4300)

```
pipenv run python manage.py runserver
```

### Adding new non-JS or non-CSS assets

Any time you add a new non-JS or non-CSS asset to the `frontend` directory, run `npm run build` once to generate a `build/asset-manifest.json` file. This file is added to git.

## Production

Prepare React files for production with the typical CRA npm build command:

```
npm run build
```

Run the following Django command to gather static files, including the compiled React assets:

```
pipenv run python manage.py collectstatic --no-input
```
