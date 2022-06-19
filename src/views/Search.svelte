<script lang="ts">
  const PAGE_TITLE: string = 'Wyszukiwanie książek'

  import Header from '../lib/Header.svelte'
  import { Search, Content, InlineLoading } from 'carbon-components-svelte'
  import axios from 'axios'
  import SearchBookItem from '../lib/SearchBookItem.svelte'
  import Information from '../lib/Information.svelte'

  let isFetching = false
  let books = []
  let searchKeyword = ''

  const tryToFindBook = (keyword: string) => new Promise((resolve, reject) => {
    // clear array before next search (or first, but that's no matter)
    books = []

    if (searchKeyword.length > 3) {
      isFetching = true

      // Google Books search using user's location, so I can't use my Heroku proxy
      let API_QUERY = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}}`

      axios.get(`${API_QUERY}`)
        .then(data => data.data.items)
        .then(fetchedBooks => {
          books.push(...fetchedBooks)
          resolve('ok')
        })
        .catch(error => reject(error))
        .finally(() => {
          isFetching = false
        })
    }
  })
</script>

<main>
  <Header
    title={ PAGE_TITLE }
    hideUtilities={ true }
  />

  <Content>
    <Search
      placeholder="Czego szukasz?"
      bind:value={searchKeyword}
      on:change={() => tryToFindBook(searchKeyword) }
    />

    <Information message="Wpisz frazę kluczową, aby wyszukać pozycje. Możesz użyć autora, tytułu lub innych słów kluczowych. Następnie kliknij przycisk i dodaj książkę do swojej biblioteki." />
  </Content>

  {#if isFetching}
    <div class="search__loader">
      <InlineLoading description="Szukam książek..." />
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
      margin-bottom: 50px;
    }
    &__placeholder {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
    }
    &__loader {
      min-height: 30vh;
      display: flex;
      align-items: center;
      justify-content: center;

      > div:first-child {
        width: auto;
      }
    }
  }
</style>