<script lang="ts">
  const PAGE_TITLE: string = 'Login'

  import { auth, provider } from '../firebase'
  import { signInWithPopup } from 'firebase/auth'
  import { authState } from 'rxfire/auth'

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
  <button on:click={login}>Zaloguj przez konto Google</button>
</main>
