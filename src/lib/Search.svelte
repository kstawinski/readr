<script lang="ts">
  export let books: BooksArray
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    Search
  } from 'carbon-components-svelte'
  import Book from '../lib/Book.svelte'

  let value = ''

	const dispatch = createEventDispatcher()

  const filter = (arr: BooksArray): BooksArray => {
    const searchValue = value.toLowerCase()
    return arr.filter(book =>
      book.title.toLowerCase().includes(searchValue)
      || book.author.toLowerCase().includes(searchValue)
    )
  }
</script>

<ComposedModal bind:open on:close={() => dispatch('close')}>
  <ModalHeader label="Wyszukiwarka" title="Czego szukasz?" />
  <ModalBody hasForm>
    <Search placeholder="Przeszukaj bibliotekę..." bind:value />
    
    {#if value.length >= 3}
      <div class="search__results">
        {#each filter(books) as book}
          <div class="search__item">
            <Book {book} />
          </div>
        {/each}
      </div>
    {/if}
  </ModalBody>
</ComposedModal>

<style>
  .search__results {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
  }

  .search__item {
    padding: .5rem;
  }

  :global(.bx--modal-content) {
    margin-bottom: 1rem;
  }
</style>