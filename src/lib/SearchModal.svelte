<script lang="ts">
  export let books: BooksArray
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'
  import { Search } from 'carbon-components-svelte'
  import Book from '../lib/Book.svelte'
  import Modal from '../lib/Modal.svelte'

  let value = ''

	const dispatch = createEventDispatcher()

  const filter = (arr: BooksArray): BooksArray => {
    const searchValue = value.toLowerCase()
    return arr.filter(book =>
      book.title.toLowerCase().includes(searchValue)
      || book.author.toLowerCase().includes(searchValue)
    )
  }

  const closeModal = () => {
    open = false
    dispatch('close')
  }
</script>

<Modal {open} label="Wyszukiwarka" title="Czego szukasz?" on:close={ () => closeModal() }>
  <svelte:fragment slot="content">
    <Search
      placeholder="Przeszukaj bibliotekę..."
      bind:value
      autofocus={true}
    />

    {#if value.length >= 3 && filter(books).length > 0}
      <div class="search__results" transition:slide>
        {#each filter(books) as book}
          <div class="search__item">
            <Book {book} />
          </div>
        {/each}
      </div>
    {/if}
  </svelte:fragment>
</Modal>

<style lang="scss">
  .search {
    &__results {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;
    }
    &__item {
      padding: .5rem;
    }
  }

  :global(.bx--modal-content) {
    margin-bottom: 1rem !important;
  }
</style>