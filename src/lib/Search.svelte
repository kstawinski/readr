<script lang="ts">
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    Search
  } from 'carbon-components-svelte'
  export let books: BooksArray
  export let open: boolean

  import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
</script>

<ComposedModal bind:open on:close={() => dispatch('close')}>
  <ModalHeader label="Wyszukiwarka" title="Czego szukasz?" />
  <ModalBody hasForm>
    <Search placeholder="Przeszukaj bibliotekę..." />
  </ModalBody>
</ComposedModal>
