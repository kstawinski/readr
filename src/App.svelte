<script lang="ts">
  import { Router, Route, Link } from 'svelte-routing'
  import AuthProxy from './views/AuthProxy.svelte'
  import Login from './views/Login.svelte'
  import Books from './views/Books.svelte'
  import Add from './views/Add.svelte'
  import Book from './views/Book.svelte'
  import { Auth } from './hooks/Auth'

  export let url = ''

  const isAuthenticated = Auth.isLoggedIn()
</script>

<div id="app">
  <Router {url}>
    {#if isAuthenticated}
      <Route path="/" component={Books} />
    {:else}
      <Route path="/" component={Login} />
    {/if}
    <Route path="login" component={Login} />
    <AuthProxy path="/books" component={Books} />
    <AuthProxy path="/add" component={Add} />
    <AuthProxy path="/book/:id" component={Book} />
  </Router>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(.loader) {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.loader > div:first-child) {
    width: auto;
  }

  @media (max-width: 500px) {
    :global(.bx--side-nav~.bx--content) {
      margin-left: 0 !important;
    }
    :global(.bx--header~.bx--content) {
      margin-top: 2rem !important;
    }
  }

  :global(.bx--side-nav__overlay-active) {
    z-index: 10;
  }

  :global(.bx--content) {
    padding: 0.8rem !important;
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
