<script lang="ts">
  const PAGE_TITLE: string = 'Dodaj książkę'

  import { Button, Tile, TextInput, InlineLoading, Row } from 'carbon-components-svelte'
  import Search16 from 'carbon-icons-svelte/lib/Search16'
  import axios from 'axios'

  let ISBN: number
  let isFetching = false

  const searchUsingISBN = () => {
    if (ISBN && ISBN.toString().length === 13) {
      isFetching = true
      axios.get(
        `https://cors-anywhere.herokuapp.com/https://data.bn.org.pl/api/bibs.json?isbnIssn=${ISBN}`,
        { timeout: 10000 })
        .then(data => data.data.bibs[0])
        .then(book => {
          console.log(book)
          isFetching = false
        })
    }
    else {
      alert('Niepoprawna dlugosc numer isbn')
      return
    }
  }
</script>

<main>
  <h1>{PAGE_TITLE}</h1>

  <Tile>
    <p>Dodaj ksiażkę, wprowadzając numer ISBN znajdujący się z tyłu okładki.</p>
    
    <div class="add__field">
      <TextInput labelText="Numer ISBN" bind:value={ISBN} />
    </div>

    <div class="add__footer">
      <Button
        kind="secondary"
        icon={Search16}
        on:click={searchUsingISBN}
        disabled={isFetching}
      >Szukaj książki</Button>

      {#if isFetching}
        <div class="add__loader">
          <InlineLoading />
        </div>
      {/if}
    </div>
  </Tile>
</main>

<style>
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