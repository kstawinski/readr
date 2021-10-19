<script lang="ts">
  export let book: Book
  import { navigate } from 'svelte-routing'

  const redirectToBook = () => navigate(
    `/book/${ book.id }`,
    { replace: true }
  )
</script>

<div class="book">
  <div class="book__thumbnail" on:click="{ redirectToBook }">
    <div
      class="book__img"
      style="background-image: url({ book.thumbnail })">
    </div>

    <!-- <Rating
      v-if="details.rate && details.rate > 0"
      :rate="details.rate"
      class="book__rating"
    /> -->
  </div>

  <div class="book__content book__text">
    <div class="book__title mb-1">{ book.title }</div>
    <div class="book__author">{ book.author }</div>
  </div>
</div>

<style>
  .book {
    max-width: 120px;
  }
  .book__title {
	 font-weight: 600;
	 font-size: 105%;
}
 .book__thumbnail {
	 height: 170px;
	 width: 100%;
	 position: relative;
}
 .book__img {
	 width: 100%;
	 height: 100%;
	 background-size: cover;
	 background-position: center center;
}
 .book__text {
	 line-height: 1.3;
   margin: 10px 5px;
}
.book__author {
  margin-top: 5px;
  font-size: 95%;
  opacity: 0.9;
}

 
</style>
