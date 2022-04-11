<script lang="ts">
  const PAGE_TITLE: string = 'Biblioteka'

  import { Books } from '../hooks/Books'
  import { Collections } from '../hooks/Collections'
  import Header from '../lib/Header.svelte'
  import Book from '../lib/Book.svelte'
  import SearchModal from '../lib/SearchModal.svelte'
  import SortingModal from '../lib/SortingModal.svelte'
  import AddModal from '../lib/AddModal.svelte'
  import BookmarkAdd from 'carbon-icons-svelte/lib/BookmarkAdd.svelte'
  import Search from 'carbon-icons-svelte/lib/Search.svelte'
  import SortDescending from 'carbon-icons-svelte/lib/SortDescending.svelte'
  import { Button, Content, InlineLoading } from 'carbon-components-svelte'

  let books: BooksArray = []
  let booksUnmodifiedArray: BooksArray = []
  let collections: CollectionsArray = []
  let isLoading = true
  let isSearchVisible = false
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

  // On slash click while search is not visible
  window.addEventListener('keyup', (event) => {
    if (!isSearchVisible && event.code === 'Slash') {
      isSearchVisible = true
    }
  });

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
</script>

<main>
  <Header
    title={PAGE_TITLE}
    on:open-add-modal={ () => isAddModalVisible = true }
  />

  <SearchModal
    books={booksUnmodifiedArray}
    open={isSearchVisible}
    on:close={() => isSearchVisible = false}
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

      <div class="books__footer">
        <Button
          icon={BookmarkAdd}
          kind="secondary"
          on:click={ () => isAddModalVisible = true }
        >Dodaj kolejną książkę</Button>

        <Button
          kind="ghost"
          iconDescription="Kliknij, aby wyszukać... (/)"
          hasIconOnly
          tooltipPosition="top"
          icon={Search}
          on:click={() => isSearchVisible = true}
        />

        <Button
          kind="ghost"
          iconDescription="Opcje sortowania"
          hasIconOnly
          tooltipPosition="top"
          icon={SortDescending}
          on:click={() => isSortingVisible = true}
        />
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

  :global(.books__footer::before) {
    // background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgb(255 255 255 / 52%) 25%, rgba(255,255,255,0) 100%);
    width: 100%;
    height: 100px;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>