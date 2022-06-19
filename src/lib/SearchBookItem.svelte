<script lang="ts">
  export let book: any

  import axios from 'axios'
  import { Button, Column, Grid, ImageLoader, InlineLoading, Row } from 'carbon-components-svelte'
  import { Add, NoImage } from 'carbon-icons-svelte'
  import { onMount } from 'svelte'
  import { Truncate } from '../hooks/Truncate'
  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'
  import { createEventDispatcher } from 'svelte'
  import { Store } from '../hooks/Store'
  import { navigate } from 'svelte-routing'
  const dispatch = createEventDispatcher()

  const fetchBookCover = () => new Promise((resolve, reject) => {
    const PROXY_URL = 'https://evening-citadel-78750.herokuapp.com'

    axios.get(`${PROXY_URL}/https://bookcoverapi.herokuapp.com/getBookCover?bookTitle=${encodeURIComponent(book.title)}&authorName=${encodeURIComponent(book.authors)}`)
      .then(data => data.data)
      .then(({ bookCoverUrl }) => {
        resolve(bookCoverUrl)
        console.log(bookCoverUrl)
      })
      .catch(error => reject(error))
  })

  const getISBN = () => {
    const isbnArray = book.industryIdentifiers
    return isbnArray.filter(item => item.type === 'ISBN_13')[0].identifier
  }

  const addToLibrary = () => {
    const bookData = {
      uid: Store.getItem('uid'),
      isbn: getISBN(),
      title: book.title,
      author: book.authors.join(', '),
      thumbnail: book.cover,
      addDate: new Date(),
      lastModifiedDate: new Date(),
      publishedAt: Number(book.publishedDate)
    }

    // submit book
    addDoc(collection(db, 'books'), bookData)
      .then(() => {
        // return to homepage
        navigate('/')
      })
      .catch(error => console.error(error))
  }

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
        <svelte:fragment slot="error">
          <NoImage size={32} />
        </svelte:fragment>
      </ImageLoader>
    </Column>

    <!-- content -->
    <Column>
      <div class="item__content">
        <div class="item__title">{ book.title }</div>
        <div class="item__author">{ (book.authors || []).join(', ') }</div>

        <div class="item__description">
          { Truncate(book.description, 35) || "" }
        </div>

        <Button
          size="field"
          kind="secondary"
          icon={Add}
          on:click={ () => addToLibrary() }
        >Dodaj do biblioteki</Button>
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
    &__content {
      margin: 0 15px;
    }
    &__description {
      line-height: 1.3;
      margin: 10px 0;
      color: #585858;
    }
    &__author {
      margin-top: 5px;
      font-size: 95%;
      opacity: 0.9;
    }
  }
</style>
