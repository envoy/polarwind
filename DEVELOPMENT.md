# Development guide principles

1. Be conscious about where we place dependencies. Ask yourself these questions:

   - Is it needed directly by the component during runtime? If so, add it as a
     dependency.
   - Is it needed during development and testing? If so, add it as a development
     dependency. This includes all things Babel/PostCSS.
   - Do we require certain libraries are present in a host app? If so, add it as a peer
     dependency. This will probably only be React.
