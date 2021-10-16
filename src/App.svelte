<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing'
  import Home from './views/Home.svelte'
  import Login from './views/Login.svelte'
  import Books from './views/Books.svelte'

  export let url = ''
</script>

<div id="app">
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="login">Login</Link>
    </nav>

    <Route path="/" component={Home} />
    <Route path="login" component={Login} />
    <Route path="books" component={Books} />
  </Router>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
