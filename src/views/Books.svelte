<script lang="ts">
  const PAGE_TITLE: string = 'Biblioteka'

  import { Books } from '../hooks/Books'
  import Header from '../lib/Header.svelte'
  import Book from '../lib/Book.svelte'
  import Search from '../lib/Search.svelte'
  import Sorting from '../lib/Sorting.svelte'

  import BookmarkAdd16 from 'carbon-icons-svelte/lib/BookmarkAdd16'
  import Search16 from 'carbon-icons-svelte/lib/Search16'
  import SortDescending16 from 'carbon-icons-svelte/lib/SortDescending16'
  import { Grid, Row, Column, Button, Content, InlineLoading } from 'carbon-components-svelte'
  import { navigate } from 'svelte-routing'

  let books: BooksArray = []
  let booksUnmodifiedArray: BooksArray = []
  let isLoading = true
  let isSearchVisible = false
  let isSortingVisible = false
  
  Books.getAllBooks()
    .then(booksArr => {
      books = booksArr
      booksUnmodifiedArray = booksArr
      isLoading = false
    })

  // On slash click while search is not visible
  window.addEventListener('keyup', (event) => {
    if (!isSearchVisible && event.code === 'Slash') {
      isSearchVisible = true
    }
  });

  const updateFilters = (options: SortingOptions) => {
    isSortingVisible = false

    const booksArray = options.showOnlyReaded ?
      booksUnmodifiedArray.filter(book => book.rate)
      : booksUnmodifiedArray

    switch (options.sortingMethod) {
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
      default:
        // sort by title
        books = booksArray.sort((a, b) => a.title.localeCompare(b.title))
        break;
    }
  }
</script>

<main>
  <Header title={PAGE_TITLE} />

  {#if isSearchVisible}
    <Search
      {books}
      open={isSearchVisible}
      on:close={() => isSearchVisible = false}
    />
  {/if}

  {#if isSortingVisible}
    <Sorting
      open={isSortingVisible}
      on:close={() => isSortingVisible = false}
      on:change={({ detail }) => updateFilters(detail)}
    />
  {/if}

  {#if isLoading}
    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
  <Content>
    <Grid>
      <Row>
        <div class="books__list">
          {#each books as book}
            <div class="books__item">
              <Book {book} />
            </div>
          {/each}
      </div>
      </Row>
    </Grid>

    <div class="books__footer">
      <Button
        icon={BookmarkAdd16}
        kind="secondary"
        on:click={() => navigate('/add')}
      >Dodaj kolejną książkę</Button>

      <Button
        kind="ghost"
        iconDescription="Kliknij, aby wyszukać... (/)"
        hasIconOnly
        tooltipPosition="top"
        icon={Search16}
        on:click={() => isSearchVisible = true}
      />

      <Button
        kind="ghost"
        iconDescription="Opcje sortowania"
        hasIconOnly
        tooltipPosition="top"
        icon={SortDescending16}
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
      z-index: 9000;
    }
    &__item {
      max-width: 31%;
      padding: 5px;
    }
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  :global(.books__footer::before) {
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgb(255 255 255 / 52%) 25%, rgba(255,255,255,0) 100%);
    width: 100%;
    height: 100px;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>