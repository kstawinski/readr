<script lang="ts">
  const PAGE_TITLE: string = 'Wyszukiwanie'

  import Header from '../lib/Header.svelte'
  import { Search, Column, Content, InlineLoading, TextInput, Grid, Button } from 'carbon-components-svelte'
import axios from 'axios';

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
      let API_QUERY = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchKeyword)}}`

      axios.get(
        `https://evening-citadel-78750.herokuapp.com/${API_QUERY}`,
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
        })
    }
  })

  const fakeSearch = () => {
    searchKeyword = 'Ekspozycja'
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

    <Button on:click={() => fakeSearch()}>Szukaj</Button>
  </Content>

  {#if isFetching}
    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Content>
      <ul>
        {#each books as book}
          <li>{book.volumeInfo.title}</li>
        {/each}
      </ul>
    </Content>
  {/if}
</main>

<style lang="scss" global>
  .search {
  }
</style>