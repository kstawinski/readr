<script>
  import { Route } from 'svelte-routing'
  import { Auth } from '../hooks/Auth'
  import AuthError from './AuthError.svelte'

  export let path
  export let component

  const isAuthenticated = Auth.isLoggedIn()
</script>

{#if isAuthenticated}
  <Route path={path} component={component} />
{:else}
  <Route path={path} component={AuthError} />
{/if}