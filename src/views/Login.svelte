<script lang="ts">
  const PAGE_TITLE: string = 'Login'

  import { Auth } from '../hooks/Auth'
  import { Store } from '../hooks/Store'
  import { navigate } from 'svelte-routing'
  import { ButtonSet, Button } from 'carbon-components-svelte'
  import LogoGoogle16 from 'carbon-icons-svelte/lib/LogoGoogle16'

  const login = () => {
    Auth.signInUsingGoogle()
      .then(({ uid }) => Store.setItem('uid', uid)
        .then(() => navigate('/books', { replace: true }))
      )
  }
</script>

<main>
  <h1>{PAGE_TITLE}</h1>

  <div class="login__buttons">
    <Button
      kind="secondary"
      icon={LogoGoogle16}
      on:click={login}
      class="login__button"
    >Zaloguj używając konta Google</Button>
  </div>
</main>

<style>
  .login__buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 20px;
  }
</style>