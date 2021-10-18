<script lang="ts">
  const PAGE_TITLE: string = 'Biblioteka'

  import { Books } from '../hooks/Books'
  import Header from '../lib/Header.svelte'
  import Book from '../lib/Book.svelte'

  import BookmarkAdd16 from 'carbon-icons-svelte/lib/BookmarkAdd16'
  import Search16 from 'carbon-icons-svelte/lib/Search16'
  import { Grid, Row, Column, Button, Content, InlineLoading } from 'carbon-components-svelte'
  import { navigate } from 'svelte-routing'

  let books: BooksArray = []
  let isLoading = true
  
  Books.getAllBooks()
    .then(booksArr => {
      books = booksArr
      isLoading = false
    })

  const redirectToAddView = () => navigate('/add', { replace: true })
</script>

<main>
  <Header title={PAGE_TITLE} />

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
        on:click={redirectToAddView}
      >Dodaj kolejną książkę</Button>

      <Button
        kind="ghost"
        iconDescription="Szukaj ksiązki"
        icon={Search16}
      />
    </div>
  </Content>
  {/if}
</main>

<style>
  .books__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 20px;
    width: 100%;
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

  .books__item {
    max-width: 31%;
    padding: 5px;
  }

  .books__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>