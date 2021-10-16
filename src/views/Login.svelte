<script lang="ts">
  const PAGE_TITLE: string = 'Login'

  import { auth, provider } from '../firebase'
  import { signInWithPopup } from 'firebase/auth'
  import { authState } from 'rxfire/auth'
  import { ButtonSet, Button } from 'carbon-components-svelte'
  import LogoGoogle16 from 'carbon-icons-svelte/lib/LogoGoogle16'

  let user;

  const unsubscribe = authState(auth).subscribe(u => user = u);

  function login () {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      })
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