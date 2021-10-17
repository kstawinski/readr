<script lang="ts">
  const PAGE_TITLE: string = 'Dodaj książkę'

  import { Button, Tile, TextInput, InlineLoading, Row, Content } from 'carbon-components-svelte'
  import Search16 from 'carbon-icons-svelte/lib/Search16'
  import axios from 'axios'

  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'
  import { Store } from '../hooks/Store'
  import { Parsers } from '../hooks/Parsers'
  import Header from '../lib/Header.svelte'

  let ISBN: number
  let isFetching = false

  const searchUsingISBN = () => new Promise((resolve, reject) => {
    if (ISBN && ISBN.toString().length === 13) {
      isFetching = true
      axios.get(
        `https://cors-anywhere.herokuapp.com/https://data.bn.org.pl/api/bibs.json?isbnIssn=${ISBN}`,
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

  // addDoc(collection(db, 'books'), {
  //   name: "Tokyo",
  //   country: "Japan"
  // });

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
          publishedAt: Number(publicationYear)
        }

        // submit book
        addDoc(collection(db, 'books'), book)
          .then(({ id }) => console.log(`Document ID: ${id}`))
          .catch(error => console.error(error))
      })
      .catch(error => {
        alert('Nie udalo sie pobrac danych')
      })
  })
</script>

<main>
  <Header title={PAGE_TITLE} />

  <Content class="add__container">
    <Tile light>
      <p>Dodaj ksiażkę, wprowadzając numer ISBN znajdujący się z tyłu okładki.</p>

      <div class="add__field">
        <TextInput labelText="Numer ISBN" bind:value={ISBN} />
      </div>

      <div class="add__footer">
        <Button
          kind="secondary"
          icon={Search16}
          on:click={addBook}
          disabled={isFetching}
        >Szukaj książki</Button>

        {#if isFetching}
          <div class="add__loader">
            <InlineLoading />
          </div>
        {/if}
      </div>
    </Tile>
  </Content>
</main>

<style>
  @media (max-width: 500px) {
    :global(.add__container) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  } 

  .add__field {
    margin: 15px 0 25px 0;
  }

  .add__footer {
    display: flex;
    align-items: center;
  }

  .add__loader {
    margin-left: 20px;
  }
</style>