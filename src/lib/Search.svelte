<script lang="ts">
  import { Modal } from 'carbon-components-svelte'
  export let books: BooksArray
  export let open: boolean

  import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const close = () => dispatch('close')
</script>

<Modal
  bind:open
  modalHeading="Create database"
  primaryButtonText="Confirm"
  secondaryButtonText="Cancel"
  on:click:button--secondary={() => (open = false)}
  on:open
  on:close={close}
  on:submit
>
  <p>Create a new Cloudant database in the US South region.</p>
</Modal>