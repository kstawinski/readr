<script lang="ts">
  const PAGE_TITLE: string = 'Dodaj książkę'

  import { slide } from 'svelte/transition'
  import {
    Button,
    Tile,
    TextInput,
    InlineLoading,
    Content,
    InlineNotification,
    NotificationActionButton
  } from 'carbon-components-svelte'
  import Search16 from 'carbon-icons-svelte/lib/Search16'
  import ScanAlt16 from 'carbon-icons-svelte/lib/ScanAlt16'
  import axios from 'axios'

  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'
  import { Store } from '../hooks/Store'
  import { Parsers } from '../hooks/Parsers'
  import Header from '../lib/Header.svelte'
  import { navigate } from 'svelte-routing'

  let ISBN: number
  let isFetching = false

  const notification = {
    isVisible: false,
    id: ''
  }

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
          .then(({ id }) => {
            console.log(`Document ID: ${id}`)
            notification.id = id
            notification.isVisible = true
          })
          .catch(error => console.error(error))
      })
      .catch(error => {
        alert('Nie udalo sie pobrac danych')
        console.warn(error)
      })
  })
</script>

<main>
  <Header title={PAGE_TITLE} />

  <Content class="add__container">
    <Tile light>
      <p>Dodaj ksiażkę, wprowadzając numer ISBN znajdujący się z tyłu okładki.</p>

      <div class="add__field">
        <TextInput type="number" labelText="Numer ISBN" bind:value={ISBN} />
      </div>

      <div class="add__footer">
        <Button
          kind="secondary"
          icon={Search16}
          on:click={addBook}
          disabled={isFetching || (ISBN || 0).toString().length !== 13}
        >Szukaj książki</Button>

        <Button
          kind="ghost"
          iconDescription="Skanuj etykietę"
          icon={ScanAlt16}
          disabled
        />

        {#if isFetching}
          <div class="add__loader">
            <InlineLoading description="Szukam..." />
          </div>
        {/if}
      </div>

      <div class="add__notification">
        {#if notification.isVisible}
        <InlineNotification
          kind="success"
          title="Sukces:"
          subtitle="Książka została dodana."
        >
          <div slot="actions" transition:slide>
            <NotificationActionButton
              on:click={() => navigate(`/book/${notification.id}`)}
            >Zobacz</NotificationActionButton>
          </div>
        </InlineNotification>
        {/if}
      </div>
    </Tile>
  </Content>
</main>

<style lang="scss">
  .add {
    &__notification {
      position: fixed;
      left: 0;
      bottom: 0;
    }
    &__field {
      margin: 15px 0 25px 0;
    }
    &__footer {
      display: flex;
      align-items: center;
    }
    &__loader {
      margin-left: 10px;
    }
  }

  @media (max-width: 500px) {
    :global(.add__container) {
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 3rem);
    }
  }
  :global(.add__notification > div:first-child) {
    margin: 0;
    max-width: 100%;
  }
</style>