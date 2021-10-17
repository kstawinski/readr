<script lang="ts">
  const PAGE_TITLE: string = 'Add book'

  import { Button, Tile, TextInput } from 'carbon-components-svelte'
  import Search16 from 'carbon-icons-svelte/lib/Search16'
</script>

<main>
  <h1>{PAGE_TITLE}</h1>

  <Tile>
    <p>Dodaj ksiażkę, wprowadzając numer ISBN znajdujący się z tyłu okładki.</p>
    
    <div class="add__field">
      <TextInput labelText="Numer ISBN" />
    </div>

    <Button kind="secondary" icon={Search16}>Szukaj książki</Button>
  </Tile>
</main>

<style>
  .add__field {
    margin: 15px 0 25px 0;
  }
</style>