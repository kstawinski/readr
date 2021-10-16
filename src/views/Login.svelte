<script lang="ts">
  const PAGE_TITLE: string = 'Login'

  import { auth, provider } from '../firebase'
  import { signInWithPopup } from 'firebase/auth'
  import { authState } from 'rxfire/auth'
  import { Button } from 'carbon-components-svelte'
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

  <Button
    kind="secondary"
    icon={LogoGoogle16}
    on:click={login}
  >Zaloguj używając Google</Button>
</main>
