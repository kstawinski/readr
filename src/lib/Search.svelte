<script lang="ts">
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Checkbox
  } from 'carbon-components-svelte'
  export let books: BooksArray
  export let open: boolean

  import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
</script>

<ComposedModal bind:open on:close={() => dispatch('close')}>
  <ModalHeader label="Wyszukiwarka" title="Wprowadź tytuł" />
  <ModalBody hasForm>
    <Checkbox labelText="I have reviewed the changes" />
  </ModalBody>
  <ModalFooter primaryButtonText="Proceed" />
</ComposedModal>
