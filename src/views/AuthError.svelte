<script>
  import { InlineNotification } from 'carbon-components-svelte'
  import { navigate } from 'svelte-routing'

  navigate('/login', { replace: true })
</script>

<InlineNotification
  title="Błąd:"
  subtitle="wymagana jest autoryzacja, by przejść dalej"
/>
