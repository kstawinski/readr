<script lang="ts">
  const PAGE_TITLE: string = 'Books'

  import { Books } from '../hooks/Books'
  import Book from '../lib/Book.svelte'

  import BookmarkAdd16 from 'carbon-icons-svelte/lib/BookmarkAdd16'
  import { Grid, Row, Column, Button } from 'carbon-components-svelte'
  import { navigate } from 'svelte-routing'

  let books: BooksArray = []
  Books.getAllBooks().then(res => books = res)

  const redirectToAddView = () => navigate('/add', { replace: true })
</script>

<main>
  <h1>{PAGE_TITLE}</h1>
  <Grid>
    <Row>
      {#each books as book}
        <Column sm={1}>
          <Book {book} />
        </Column>
      {/each}
    </Row>
  </Grid>

  <div class="books__footer">
    <Button
      icon={BookmarkAdd16}
      kind="secondary"
      on:click={redirectToAddView}
    >Dodaj kolejną książkę</Button>
  </div>
</main>

<style>
  .books__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 20px;
  }
</style>