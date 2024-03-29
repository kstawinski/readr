<script lang="ts">
  export let book: Book
  export let collections: CollectionsArray

  import { createEventDispatcher } from 'svelte'
  import Rating from '../lib/Rating.svelte'
  import BookModal from '../lib/BookModal.svelte'
  import EditModal from '../lib/EditModal.svelte'
  import { Books } from '../hooks/Books';

  const dispatch = createEventDispatcher()

  let isBookModalVisible = false
  let isEditModalVisible = false

  const switchModals = () => {
    isEditModalVisible = !isEditModalVisible
    isBookModalVisible = !isBookModalVisible
  }

  const closeModalsAfterSuccess = () => {
    isEditModalVisible = false
    isBookModalVisible = false
    dispatch('successEdit')
  }

  const deleteBook = (id: string) => {
    Books.delete(id)
      .then(() => {
        dispatch('delete', id)
        isBookModalVisible = false
        isEditModalVisible = false
      })
      .catch(error => console.warn(error))
  }
</script>

<BookModal
  {book}
  collections={collections || []}
  open={isBookModalVisible}
  on:close={ () => isBookModalVisible = false }
  on:edit={ () => switchModals() }
/>

<EditModal
  {book}
  open={isEditModalVisible}
  on:close={() => isEditModalVisible = false}
  on:cancel={() => switchModals() }
  on:delete={() => deleteBook(book.id)}
  on:edit={() => closeModalsAfterSuccess()}
/>

<div class="book">
  <div class="book__thumbnail" on:click={ () => isBookModalVisible = true }>
    <div
      class="book__img"
      style="background-image: url({ book.thumbnail })">
    </div>
  </div>

  <div class="book__text">
    {#if Number(book.rate)}
      <Rating rate={ book.rate } />
    {/if}
    <div class="book__title">{ book.title }</div>
    <div class="book__author">{ book.author }</div>
  </div>
</div>

<style lang="scss">
  .book {
    &__title {
      font-weight: 600;
      font-size: 105%;
    }
    &__thumbnail {
      height: 170px;
      width: 100%;
      position: relative;
      cursor: pointer;
    }
    &__img {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
      border-radius: 2px;
    }
    &__text {
      line-height: 1.3;
      margin: 10px 5px;
    }
    &__author {
      margin-top: 5px;
      font-size: 95%;
      opacity: 0.9;
    }
  }
</style>
