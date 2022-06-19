<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import AuthProxy from './views/AuthProxy.svelte'
  import Login from './views/Login.svelte'
  import Books from './views/Books.svelte'
  import Search from './views/Search.svelte'
  import { Auth } from './hooks/Auth'
  import LogoutSection from './lib/LogoutSection.svelte'

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
    <AuthProxy path="/search" component={Search} />

    {#if isAuthenticated}
      <LogoutSection />
    {/if}
  </Router>
</div>

<style global>
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    letter-spacing: 0 !important;
  }
  
  .loader {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader > div:first-child {
    width: auto;
  }

  .bx--modal.is-visible {
    /* fix modal overlay position */
    z-index: 10000;
  }

  .bx--side-nav__item:hover {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    .bx--side-nav~.bx--content {
      margin-left: 0 !important;
    }
  }

  .bx--side-nav__overlay-active {
    z-index: 10;
  }

  .bx--content {
    padding: 0.8rem !important;
  }

  /* Blur background under modal */
  .bx--modal {
    backdrop-filter: blur(3px);
  }
</style>
