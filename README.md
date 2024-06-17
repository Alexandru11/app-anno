# annotate-app

Cloud-based Web application for data annotators to easily do text annotations that serve Natural Language Processing tasks. 
The project’s main goal was to come up with a better option in today’s free annotation applications by offering a single Cloud tool for annotators to receive,
assign and collaborate seamlessly on annotation tasks. 

Inbound annotation tasks are received through messaging queue consumer micro-services.

Authentication is done via redirection to Auth0 and using auth0 library.

Check out the other repositories for the micro-services involved in the backend.

TODO: Readme to be updated with the actual architecture diagram.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
