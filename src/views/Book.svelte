<script lang="ts">
  export let id: string

  import { Books } from '../hooks/Books'
  import {
    ImageLoader,
    InlineLoading,
    Content,
    Button
  } from 'carbon-components-svelte'
  import Header from '../lib/Header.svelte'
  import EditModal from '../lib/EditModal.svelte'

  let book: Book
  let isLoading = true
  let isEditModalVisible = false

  Books.getBook(id)
    .then(response => {
      book = response
      isLoading = false
    })

</script>

<main>
  {#if isLoading}
    <Header title="" />

    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Header title={ book.title } />

    {#if isEditModalVisible}
      <EditModal
        {book}
        open={isEditModalVisible}
        on:close={() => isEditModalVisible = false}
      />
    {/if}

    <Content>
      <div class="book">
        <div class="book__thumbnail">
          <ImageLoader src="{book.thumbnail}">
            <div slot="loading">
              <InlineLoading />
            </div>
            <div slot="error">An error occurred.</div>
          </ImageLoader>
        </div>

        <div class="book__meta">
          <div class="book__metaItem book__metaItem-featured">{book.title}</div>
          <div class="book__metaItem">{book.author}</div>
        </div>

        <Button kind="secondary" on:click={() => isEditModalVisible = true}>Edytuj książkę</Button>
      </div>
    </Content>
  {/if}
</main>

<style>
  :global(.book__field) {
    margin-bottom: 5px;
  }
  .book {
    margin-top: 2.5rem;
  }
  .book__thumbnail {
    width: 50%;
    max-width: 220px;
    margin: 20px auto;
    display: block;
  }
  .book__meta {
    text-align: center;
  }
  .book__metaItem:not(:last-child) {
    margin-bottom: 6px;
  }
  .book__metaItem-featured {
    font-weight: bold;
    font-size: 130%;
  }
</style>