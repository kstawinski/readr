<script lang="ts">
  const PAGE_TITLE: string = 'Zaloguj się'

  import { navigate } from 'svelte-routing'
  import { Auth } from '../hooks/Auth'
  import { Store } from '../hooks/Store'
  import { Button } from 'carbon-components-svelte'
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
    <img class="login__illustration" src="./login-illustration.svg" alt="">

    <div class="login__fadeAnimation">
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
  </div>
</main>

<style lang="scss">
  .login {
    &__title {
      font-size: 2.225rem;
    }
    &__paragraph {
      margin: 15px 0 30px 0;
    }
    &__content {
      margin: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    &__illustration {
      max-width: 300px;
      height: auto;
      margin-bottom: 50px;
      animation-name: fade-top;
      animation-duration: 3s;
    }
    &__fadeAnimation {
      animation-name: fade;
      animation-duration: 1s;
    }
  }

  @keyframes fade-top {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      tranasform: translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>