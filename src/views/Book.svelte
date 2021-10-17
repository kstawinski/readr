<script lang="ts">
  import { Books } from '../hooks/Books'

  const PAGE_TITLE: string = 'Widok ksiazki'

  export let id: string
  let book: Book

  Books.getBook(id)
    .then(response => book = response)
</script>

<main class="book">
  <h1>{PAGE_TITLE}</h1>

  {#if book}
    <pre>{book.id}</pre>  
  {/if}
</main>

<style>

</style>