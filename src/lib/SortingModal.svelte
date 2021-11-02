<script lang="ts">
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import {
    Button,
    Checkbox,
    Select,
    SelectItem
  } from 'carbon-components-svelte'
  import Modal from '../lib/Modal.svelte'

	const dispatch = createEventDispatcher()

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

  const isRatingRequired = () => {
    const sortingRequiringEvaluation = ['ratingAsc', 'ratingDes']

    if (sortingRequiringEvaluation.includes(form.sortingMethod)) {
      form.showOnlyReaded = true
      isCheckboxDisabled = true
    } else {
      isCheckboxDisabled = false
    }
  }

  const closeModal = () => {
    open = false
    dispatch('close')
  }
</script>

<Modal {open} size="sm" title="Ustawienia sortowania" on:close={ () => closeModal() }>
  <svelte:fragment slot="content">
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
  </svelte:fragment>

  <svelte:fragment slot="footer">
    <Button kind="secondary" on:click={ () => closeModal() }>
      Anuluj
    </Button>

    <Button kind="primary" on:click={ () => dispatch('change', form) }>
      Zapisz ustawienia
    </Button>
  </svelte:fragment>
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