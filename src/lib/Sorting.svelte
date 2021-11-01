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

  let isCheckboxDisabled = false

  const sortingMethods = [
    { id: 'title', name: 'Tytułu (alfabetycznie)' },
    { id: 'author', name: 'Autora (alfabetycznie)' },
    { id: 'ratingAsc', name: 'Oceny książki (od najsłabszych)' },
    { id: 'ratingDes', name: 'Oceny książki (od najlepszych)' },
    { id: 'addAsc', name: 'Daty dodania (rosnąco)' },
    { id: 'addDes', name: 'Daty dodania (malejąco)' }
  ]

	const dispatch = createEventDispatcher()

  const isRatingRequired = () => {
    const sortingRequiringEvaluation = ['ratingAsc', 'ratingDes']

    if (sortingRequiringEvaluation.includes(form.sortingMethod)) {
      form.showOnlyReaded = true
      isCheckboxDisabled = true
    } else {
      isCheckboxDisabled = false
    }
  }
</script>

<Modal
  bind:open
  size="sm"
  hasForm
  modalHeading="Ustawienia sortowania"
  primaryButtonText="Zapisz ustawienia"
  secondaryButtonText="Anuluj"
  on:click:button--secondary={ () => open = false }
  on:close={ () => dispatch('close') }
  on:submit={ () => dispatch('change', form) }
>
  <div class="sorting__field">
    <Select
      labelText="Sortuj według"
      bind:selected={ form.sortingMethod }
      on:change={ () => isRatingRequired() }
    >
      {#each sortingMethods as method}
        <SelectItem value={ method.id } text={ method.name } /> 
      {/each}
    </Select>
  </div>

  <div class="sorting__field">
    <Checkbox
      labelText="Wyświetlaj tylko przeczytane pozycje (ocenione)"
      bind:checked={ form.showOnlyReaded }
      disabled={ isCheckboxDisabled }
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