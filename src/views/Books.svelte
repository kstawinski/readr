<script lang="ts">
  const PAGE_TITLE: string = 'Books'

  import { Books } from '../hooks/Books'
  import { Store } from '../hooks/Store'

  let books: BooksArray = []
  Books.getAllBooks(Store.getItem('uid')).then(res => books = res)
</script>

<main>
  <h1>{PAGE_TITLE}</h1>
  {#each books as book}
    {book.title}
  {/each}
</main>
