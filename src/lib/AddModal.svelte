<script lang="ts">
  // props from Header component, then used by Modal
  export let open: boolean
  export let label: string
  export let title: string

  import { createEventDispatcher } from 'svelte'
  import {
    Button,
    NumberInput,
    InlineLoading
  } from 'carbon-components-svelte'
  import axios from 'axios'

  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'
  import { Store } from '../hooks/Store'
  import { Parsers } from '../hooks/Parsers'
  import Modal from '../lib/Modal.svelte'

  let ISBN: number
  let isFetching = false
  let isSuccess = false

  const dispatch = createEventDispatcher()

  const searchUsingGoogleBooks = () => new Promise((resolve, reject) => {
    if (ISBN && ISBN.toString().length === 13) {
      isFetching = true
      axios.get(
        `https://evening-citadel-78750.herokuapp.com/https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`,
        { timeout: 10000 })
        .then(data => data.data.items[0].volumeInfo)
        .then(book => {
          console.log(book)
          resolve(book)
          isFetching = false
        })
        .catch(error => reject(error))
    }
  })

  const searchUsingISBN = () => new Promise((resolve, reject) => {
    if (ISBN && ISBN.toString().length === 13) {
      isFetching = true
      axios.get(
        `https://evening-citadel-78750.herokuapp.com/https://data.bn.org.pl/api/bibs.json?isbnIssn=${ISBN}`,
        { timeout: 10000 })
        .then(data => data.data.bibs[0])
        .then(book => {
          console.log(book)
          resolve(book)
          isFetching = false
        })
        .catch(error => reject(error))
    }
    else {
      alert('Niepoprawna dlugosc numer isbn')
      return
    }
  })

  const addBook = () => new Promise((resolve, reject) => {
    searchUsingISBN()
      .then(({ title, author, publicationYear }) => {
        const book = {
          uid: Store.getItem('uid'),
          isbn: Number(ISBN),
          title: Parsers.parseTitle(title),
          author: Parsers.parseAuthor(author),
          thumbnail: `https://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg`,
          addDate: new Date(),
          lastModifiedDate: new Date(),
          publishedAt: Number(publicationYear)
        }

        // submit book
        addDoc(collection(db, 'books'), book)
          .then(() => {
            isSuccess = true
            dispatch('success')
            closeModal()
          })
          .catch(error => console.error(error))
      })
      .catch(() => {
        // second fetch using Google Books
        searchUsingGoogleBooks()
          .then(({ authors, publishedDate, title }) => {
            const book = {
              uid: Store.getItem('uid'),
              isbn: Number(ISBN),
              title: title,
              author: authors[0],
              thumbnail: `https://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg`,
              addDate: new Date(),
              lastModifiedDate: new Date(),
              publishedAt: Number(publishedDate)
            }

            // submit book
            addDoc(collection(db, 'books'), book)
              .then(() => {
                isSuccess = true
                closeModal()
                dispatch('success')
              })
              .catch(error => console.error(error))
          })
          .catch(error => console.error(error))
      })
  })

  const closeModal = () => {
    open = false
    dispatch('close')
  }
</script>

<Modal {open} {label} {title} on:close={ () => closeModal() } size="xs">
  <div slot="content">
    <p>Dodaj ksiażkę, wprowadzając numer ISBN znajdujący się z tyłu okładki.</p>

    <div class="add__field">
      <NumberInput
        hideSteppers
        label="Numer ISBN"
        bind:value={ISBN}
      />
    </div>

    {#if isFetching}
      <InlineLoading description="Szukam..." />
    {/if}

    {#if isSuccess}
      <InlineLoading status="finished" description="Dodano książkę!" />
    {/if}
  </div>

  <svelte:fragment slot="footer">
    <Button
      kind="secondary"
      on:click={ () => closeModal() }
    >Anuluj</Button>

    <Button
      kind="primary"
      on:click={addBook}
      disabled={isFetching || (ISBN || 0).toString().length !== 13}
    >Szukaj książki</Button>
  </svelte:fragment>
</Modal>

<style lang="scss">
  .add {
    &__field {
      margin: 20px 0 10px 0;
    }
  }
</style>
