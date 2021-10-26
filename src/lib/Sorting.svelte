<script lang="ts">
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import {
    Checkbox,
    Modal,
    Select,
    SelectItem
  } from 'carbon-components-svelte'

  let form = {
    sortingMethod: '',
    showOnlyReaded: false
  }

  const sortingOptions = [
    { id: '0', text: 'Tytułu' },
    { id: '1', text: 'Autora' },
    { id: '2', text: 'Oceny książki (od najsłabszych)' },
    { id: '3', text: 'Oceny książki (od najlepszych)' },
    { id: '4', text: 'Daty dodania (rosnąco)' },
    { id: '5', text: 'Daty dodania (malejąco)' },
    { id: '6', text: 'Daty edycji (rosnąco)' },
    { id: '7', text: 'Daty edycji (malejąco)' }
  ]

	const dispatch = createEventDispatcher()
</script>

<Modal
  bind:open
  size="sm"
  modalHeading="Ustawienia sortowania"
  primaryButtonText="Zapisz ustawienia"
  secondaryButtonText="Anuluj"
  on:click:button--secondary={ () => open = false }
  on:open
  on:close={ () => dispatch('close') }
  hasForm
  on:submit={ () => dispatch('change', form) }
>
  <div class="sorting__field">
    <Select labelText="Sortuj według" bind:selected={ form.sortingMethod }>
      {#each sortingOptions as option}
        <SelectItem value={ option.id } text={ option.text } /> 
      {/each}
    </Select>
  </div>

  <div class="sorting__field">
    <Checkbox
      labelText="Wyświetlaj tylko przeczytane pozycje (ocenione)"
      bind:checked={ form.showOnlyReaded }
    />
  </div>
</Modal>

<style lang="scss">
  .sorting {
    &__field {
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
</style>