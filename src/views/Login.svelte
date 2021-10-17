<script lang="ts">
  const PAGE_TITLE: string = 'Zaloguj się'

  import { Auth } from '../hooks/Auth'
  import { Store } from '../hooks/Store'
  import { navigate } from 'svelte-routing'
  import { ButtonSet, Button } from 'carbon-components-svelte'
  import LogoGoogle16 from 'carbon-icons-svelte/lib/LogoGoogle16'

  const login = () => {
    Auth.signInUsingGoogle()
      .then(({ uid, displayName, email, photoURL }) => {
        Store.setItem('uid', uid)
        Store.setItem('name', displayName)
        Store.setItem('email', email)
        Store.setItem('avatar', photoURL)
      })
      .then(() => navigate(
        '/books',
        { replace: true }
      ))
  }
</script>

<main class="login__content">
  <div>
    <h1 class="login__title">{PAGE_TITLE}</h1>
    <p class="login__paragraph">Użyj swojego konta Google, aby zarejestrować lub zalogować się do aplikacji.</p>

    <Button
      kind="secondary"
      icon={LogoGoogle16}
      on:click={login}
      size="lg"
      class="login__button"
    >Zaloguj używając konta Google</Button>
  </div>
</main>

<style>
  .login__title {
    font-size: 2.225rem;
  }

  .login__paragraph {
    margin: 15px 0 30px 0;
  }

  .login__content {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>