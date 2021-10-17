<script lang="ts">
  const PAGE_TITLE: string = 'Biblioteka'

  import { Books } from '../hooks/Books'
  import Header from '../lib/Header.svelte'
  import Book from '../lib/Book.svelte'

  import BookmarkAdd16 from 'carbon-icons-svelte/lib/BookmarkAdd16'
  import { Grid, Row, Column, Button, Content } from 'carbon-components-svelte'
  import { navigate } from 'svelte-routing'

  let books: BooksArray = []
  Books.getAllBooks().then(res => books = res)

  const redirectToAddView = () => navigate('/add', { replace: true })
</script>

<main>
  <Header title={PAGE_TITLE} />

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
    </div>
  </Content>
</main>

<style>
  .books__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 20px;
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