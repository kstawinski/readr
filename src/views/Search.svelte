<script lang="ts">
  const PAGE_TITLE: string = 'Wyszukiwanie'

  import Header from '../lib/Header.svelte'
  import { Search, Column, Content, InlineLoading, TextInput, Grid, Button } from 'carbon-components-svelte'
import axios from 'axios';
import SearchBookItem from '../lib/SearchBookItem.svelte'
import Information from '../lib/Information.svelte'

  let isFetching = false

  const useSearch = (keyword: string): void => {
    if (keyword.length > 2) {
      // reset "filter by category"
      collectionID = ''

      const searchValue = keyword.toLowerCase()
      books = booksUnmodifiedArray.filter(book =>
        book.title.toLowerCase().includes(searchValue)
        || book.author.toLowerCase().includes(searchValue)
      )
    } else if (keyword.length === 0) { // on close field / delete value from input 
      books = booksUnmodifiedArray
    }
  }

  let books = []
  let searchKeyword = ''

  const tryToFindBook = () => new Promise((resolve, reject) => {
    if (searchKeyword.length > 3) {
      isFetching = true
      
      // Google Books search using user's location, so I can't use Heroku proxy
      let API_QUERY = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchKeyword)}}`

      axios.get(
        `${API_QUERY}`,
        { timeout: 10000 })
        .then(data => data.data.items)
        .then(fetchedBooks => {
          // console.log(extractedBooks)
          books.push(...fetchedBooks)
          resolve('ok')
          console.log(books)
        })
        .catch(error => reject(error))
        .finally(() => {
          isFetching = false
          searchKeyword = ''
        })
    }
  })

  const fakeSearch = () => {
    searchKeyword = 'Katarzyna Bonda'
    tryToFindBook()
  }
</script>

<main>
  <Header
    title={PAGE_TITLE}
    hideUtilities={ true }
  />

  <Content>
    <Search
      placeholder="Czego szukasz?"
      bind:value={searchKeyword}
      on:change={() => tryToFindBook() }
    />

    <button on:click={() => fakeSearch()}>XADSSADSA</button>

    <Information message="Wpisz frazę kluczową, aby wyszukać pozycje. Możesz użyć numeru ISBN, autora, tytułu lub innych słów kluczowych. Następnie kliknij przycisk i dodaj książkę do swojej biblioteki." />
  </Content>

  {#if isFetching}
    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Content>
      <ul>
        {#each books as book}
          <li class="search__item">
            <SearchBookItem book={ book.volumeInfo } />
          </li>
        {/each}
      </ul>
    </Content>
  {/if}
</main>

<style lang="scss" global>
  .search {
    &__item {
      margin-bottom: 15px;
    }
  }
</style>