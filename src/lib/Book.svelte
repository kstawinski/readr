<script lang="ts">
  export let book: Book
  import Rating from '../lib/Rating.svelte'
  import BookModal from '../lib/BookModal.svelte'
  import EditModal from '../lib/EditModal.svelte'

  let isBookModalVisible = false
  let isEditModalVisible = false

  const switchModals = () => {
    isEditModalVisible = !isEditModalVisible
    isBookModalVisible = !isBookModalVisible
  }
</script>

<BookModal
  {book}
  open={isBookModalVisible}
  on:close={ () => isBookModalVisible = false }
  on:edit={ () => switchModals() }
/>

<EditModal
  {book}
  open={isEditModalVisible}
  on:close={() => isEditModalVisible = false}
  on:cancel={() => switchModals() }
/>

<div class="book">
  <div class="book__thumbnail" on:click={ () => isBookModalVisible = true }>
    <div
      class="book__img"
      style="background-image: url({ book.thumbnail })">
    </div>
  </div>

  <div class="book__text">
    {#if book.rate}
      <Rating rate={ book.rate } />
    {/if}
    <div class="book__title">{ book.title }</div>
    <div class="book__author">{ book.author }</div>
  </div>
</div>

<style lang="scss">
  .book {
    width: 120px;

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
