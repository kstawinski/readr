<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import AuthProxy from './views/AuthProxy.svelte'
  import Login from './views/Login.svelte'
  import Books from './views/Books.svelte'
  import Book from './views/Book.svelte'
  import Collections from './views/Collections.svelte'
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
    <AuthProxy path="/book/:id" component={Book} />
    <AuthProxy path="/collections" component={Collections} />
  </Router>
</div>

<style>
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

  :global(.bx--modal.is-visible) {
    /* fix modal overlay position */
    z-index: 10000;
  }

  :global(.bx--side-nav__item:hover) {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    :global(.bx--side-nav~.bx--content) {
      margin-left: 0 !important;
    }
  }

  :global(.bx--side-nav__overlay-active) {
    z-index: 10;
  }

  :global(.bx--content) {
    padding: 0.8rem !important;
  }
</style>
