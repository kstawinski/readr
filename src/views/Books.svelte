<script lang="ts">
  const PAGE_TITLE: string = 'Biblioteka'

  import { Books } from '../hooks/Books'
  import { Collections } from '../hooks/Collections'
  import Header from '../lib/Header.svelte'
  import Book from '../lib/Book.svelte'
  import SortingModal from '../lib/SortingModal.svelte'
  import AddModal from '../lib/AddModal.svelte'
  import { Content, InlineLoading } from 'carbon-components-svelte'

  let books: BooksArray = []
  let booksUnmodifiedArray: BooksArray = []
  let collections: CollectionsArray = []
  let isLoading = true
  let isSortingVisible = false
  let isAddModalVisible = false

  Books.getAllBooks()
    .then(booksArr => {
      books = booksArr
      booksUnmodifiedArray = booksArr
      updateSort({ method: 'editDes', isRatingRequired: false })

      Collections.getAll().then(collectionsArr => {
        collections = collectionsArr
        isLoading = false
      })
    })

  const updateSort = (options: SortingOptions) => {
    isSortingVisible = false

    const booksArray = options.isRatingRequired ?
      booksUnmodifiedArray.filter(book => book.rate)
      : booksUnmodifiedArray

    switch (options.method) {
      case 'title':
        books = booksArray.sort((a, b) => a.title.localeCompare(b.title))
        break;
      case 'author':
        books = booksArray.sort((a, b) => a.author.localeCompare(b.author))
        break;
      case 'ratingAsc':
        books = booksArray.sort((a, b) => a.rate - b.rate)
        break;
      case 'ratingDes':
        books = booksArray.sort((a, b) => b.rate - a.rate)
        break;
      case 'addAsc':
        books = booksArray.sort((a, b) => Number(a.addDate) - Number(b.addDate))
        break;
      case 'addDes':
        books = booksArray.sort((a, b) => Number(b.addDate) - Number(a.addDate))
        break;
      case 'editAsc':
        books = booksArray.sort((a, b) => Number(a.lastModifiedDate) - Number(b.lastModifiedDate))
        break;
      case 'editDes':
        books = booksArray.sort((a, b) => Number(b.lastModifiedDate) - Number(a.lastModifiedDate))
        break;
      default:
        // sort by title
        books = booksArray.sort((a, b) => a.title.localeCompare(b.title))
        break;
    }
  }

  const removeBookFromArray = (id: string) => books = books.filter(book => book.id !== id)

  const useSearch = (keyword: string): void => {
    if (keyword.length > 2) {
      const searchValue = keyword.toLowerCase()
      books = books.filter(book =>
        book.title.toLowerCase().includes(searchValue)
        || book.author.toLowerCase().includes(searchValue)
      )
    } else if (keyword.length === 0) { // on close field / delete value from input 
      books = booksUnmodifiedArray
    }
  }
</script>

<main>
  <Header
    title={PAGE_TITLE}
    on:open-add-modal={ () => isAddModalVisible = true }
    on:open-sorting-modal={ () => isSortingVisible = true }
    on:search={ ({ detail }) => useSearch(detail) }
  />

  <AddModal
    label="Nowa książka" title="Dodaj przez ISBN"
    open={ isAddModalVisible }
    on:close={ () => isAddModalVisible = false }
  />

  <SortingModal
    open={isSortingVisible}
    on:close={() => isSortingVisible = false}
    on:change={({ detail }) => updateSort(detail)}
  />

  {#if isLoading}
    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Content>
      <div class="books__list">
        {#each books as book (book.id)}
          <Book
            {book}
            {collections}
            on:delete={({ detail }) => removeBookFromArray(detail)}
          />
        {/each}
      </div>
    </Content>
  {/if}
</main>

<style lang="scss">
  .books {
    &__footer {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20px;
      width: 100%;
      /* z-index pulls the menu to the top on desktop devices */
      z-index: 8000;
    }
    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 15px;
    }
  }
</style>