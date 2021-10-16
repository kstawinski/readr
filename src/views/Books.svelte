<script lang="ts">
  const PAGE_TITLE: string = 'Books'

  import { Books } from '../hooks/Books'
  import { Store } from '../hooks/Store'

  import Book from '../lib/Book.svelte'

  import { Grid, Row, Column } from 'carbon-components-svelte'

  let books: BooksArray = []
  Books.getAllBooks(Store.getItem('uid')).then(res => books = res)
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
</main>
