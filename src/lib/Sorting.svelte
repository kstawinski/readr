<script lang="ts">
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import {
    Checkbox,
    Modal,
    Select,
    SelectItem
  } from 'carbon-components-svelte'

  let form: SortingOptions = {
    sortingMethod: '',
    showOnlyReaded: false
  }

  const sortingOptions = [
    { id: 'title', text: 'Tytułu (alfabetycznie)' },
    { id: 'author', text: 'Autora (alfabetycznie)' },
    { id: 'ratingAsc', text: 'Oceny książki (od najsłabszych)' },
    { id: 'ratingDes', text: 'Oceny książki (od najlepszych)' },
    { id: 'addAsc', text: 'Daty dodania (rosnąco)' },
    { id: 'addDes', text: 'Daty dodania (malejąco)' }
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