<script lang="ts">
  const PAGE_TITLE: string = 'Wyszukiwanie'

  import Header from '../lib/Header.svelte'
  import { Content, InlineLoading } from 'carbon-components-svelte'

  let isLoading = false

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
</script>

<main>
  <Header
    title={PAGE_TITLE}
    hideUtilities={ true }
  />

  {#if isLoading}
    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Content>
      
    </Content>
  {/if}
</main>

<style lang="scss" global>
</style>