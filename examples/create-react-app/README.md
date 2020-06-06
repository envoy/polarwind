# Example App: Create React App

Demonstrates Polarwind inside a
[create-react-app](https://github.com/facebookincubator/create-react-app) project with
minimal setup and configuration.

## Dependencies

- [yarn](https://github.com/yarnpkg/yarn/) or [npm](https://www.npmjs.com/)
- [direnv](https://direnv.net/)

## Getting started

### Installation

Install all the project dependencies.

```bash
npm install
```

### Development

Run the local `create-react-app` development server with Polarwind preconfigured.

```bash
npm start
```

Open **http://localhost:3000** in your browser and you should see the Polarwind example
application.

### Embedded development

The project includes an express server that proxies the `create-react-app` development
server so that it may be used in an embedded way inside of the Envoy Dashboard. Instead of
running `npm start`, run `npm run dev` instead. It will launch both the `create-react-app`
development server and express.

```bash
npm run dev
```

You will need to install `direnv` to set the required environment variables.
