<script lang="ts">
  import { Books } from '../hooks/Books'
  import { ImageLoader, InlineLoading, Content, Button, Column } from 'carbon-components-svelte'
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    TextInput,
    Grid,
    Row,
    TextArea,
    NumberInput
  } from 'carbon-components-svelte'
  import Header from '../lib/Header.svelte'

  export let id: string
  let book: Book
  let isLoading = true
  let open = false

  Books.getBook(id)
    .then(response => {
      book = response
      isLoading = false
    })
</script>

<main>
  {#if isLoading}
    <Header title="" />

    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Header title={ book.title } />
    
    <ComposedModal bind:open>
      <ModalHeader label="{ book.title }" title="Edycja książki" />
      <ModalBody hasForm>
        <Grid>
          <Row>
            <Column lg={5}>
              <ImageLoader
                src={book.thumbnail}
              />
            </Column>
            <Column lg={11}>
              <FormGroup legendText="Podstawowe dane">
                <div class="book__field"><TextInput placeholder="Tytuł" bind:value={book.title} /></div>
                <div class="book__field"><TextInput placeholder="Autor" bind:value={book.author} /></div>
                <div class="book__field"><TextInput placeholder="ISBN" bind:value={book.isbn} /></div>
              </FormGroup>

              <FormGroup legendText="Szczegóły">
                <div class="book__field"><TextInput placeholder="Rok publikacji" bind:value={book.publishedAt} /></div>
                <div class="book__field"><TextInput placeholder="Liczba stron" bind:value={book.pages} /></div>
              </FormGroup>

              <FormGroup legendText="Twoja ocena">
                <div class="book__field">
                  <NumberInput
                    min={0}
                    max={5}
                    bind:value={book.rate}
                    invalidText="Błędny zakres oceny (0-5)."
                    placeholder="Ocena książki"
                  />
                </div>
                <div class="book__field"><TextArea placeholder="Notatka" bind:value={book.description} /></div>
              </FormGroup>
            </Column>
          </Row>
        </Grid>
      </ModalBody>
      <ModalFooter primaryButtonText="Zapisz" secondaryButtonText="Anuluj" />
    </ComposedModal>

    <Content>
      <div class="book">
        <div class="book__thumbnail">
          <ImageLoader src="{book.thumbnail}">
            <div slot="loading">
              <InlineLoading />
            </div>
            <div slot="error">An error occurred.</div>
          </ImageLoader>
        </div>

        <div class="book__meta">
          <div class="book__metaItem book__metaItem-featured">{book.title}</div>
          <div class="book__metaItem">{book.author}</div>
        </div>

        <Button kind="secondary" on:click={() => open = true}>Edytuj książkę</Button>
      </div>
    </Content>
  {/if}
</main>

<style>
  :global(.book__field) {
    margin-bottom: 5px;
  }
  .book {
    margin-top: 2.5rem;
  }
  .book__thumbnail {
    width: 50%;
    max-width: 220px;
    margin: 20px auto;
    display: block;
  }

  .book__meta {
    text-align: center;
  }

  .book__metaItem:not(:last-child) {
    margin-bottom: 6px;
  }

  .book__metaItem-featured {
    font-weight: bold;
    font-size: 130%;
  }
</style>