<script lang="ts">
  export let open: boolean
  export let label = ''
  export let title: string
  export let size = null

  import { createEventDispatcher } from 'svelte'
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'carbon-components-svelte'

  const dispatch = createEventDispatcher()

  const dispatchClose = () => dispatch('close')
</script>

<ComposedModal bind:open on:close={ () => dispatchClose() } {size}>
  <ModalHeader {label} {title} />
  <ModalBody hasForm>
    <slot name="content"></slot>
  </ModalBody>

  {#if $$slots.footer}
    <ModalFooter>
      <slot name="footer"></slot>
    </ModalFooter>
  {/if}
</ComposedModal>
