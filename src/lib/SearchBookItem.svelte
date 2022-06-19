<script lang="ts">
  import axios from "axios";
  import { Column, Grid, ImageLoader, InlineLoading, Row } from "carbon-components-svelte";
  import { onMount } from "svelte";
  import { Truncate } from '../hooks/Truncate'

  export let book: any

  // import { createEventDispatcher } from 'svelte'

  const fetchBookCover = () => new Promise((resolve, reject) => {
    const PROXY_URL = 'https://evening-citadel-78750.herokuapp.com'

    axios.get(`${PROXY_URL}/https://bookcoverapi.herokuapp.com/getBookCover?bookTitle=${encodeURIComponent(book.title)}&authorName=${encodeURIComponent(book.authors)}`)
      .then(data => data.data)
      .then(({ bookCoverUrl }) => {
        resolve(bookCoverUrl)
        console.log(bookCoverUrl)
      })
      .catch(e => reject(e))
  })

  onMount(() => {
    fetchBookCover()
      .then(cover => book.cover = cover)
  })
</script>

<Grid>
  <Row noGutter>
    <!-- image -->
    <Column sm={1}>
      <ImageLoader fadeIn src={ book.cover }>
        <svelte:fragment slot="loading">
          <InlineLoading />
        </svelte:fragment>
        <svelte:fragment slot="error">An error occurred.</svelte:fragment>
      </ImageLoader>
    </Column>

    <!-- content -->
    <Column>
      <div class="item__content">
        <div class="item__title">{ book.title }</div>
        <div class="item__author">{ book.authors || "" }</div>
        
        <div class="item__description">
          { Truncate(book.description, 55) || "" }
        </div>
      </div>
    </Column>
  </Row>
</Grid>

<style lang="scss">
  .item {
    &__flex {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__title {
      font-weight: 600;
      font-size: 105%;
    }
    // &__thumbnail {
    //   height: 170px;
    //   width: 100%;
    //   position: relative;
    //   cursor: pointer;
    // }
    // &__img {
    //   width: 100%;
    //   height: 100%;
    //   background-size: cover;
    //   background-position: center center;
    //   border-radius: 2px;
    // }
    &__content {
      margin: 0 15px
    }
    &__description {
      line-height: 1.3;
      margin: 10px 0;
      color: rgb(88, 88, 88);
      // white-space: nowrap;
      max-height: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__author {
      margin-top: 5px;
      font-size: 95%;
      opacity: 0.9;
    }
  }
</style>
