<script lang="ts">
  export let book: Book
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import { Collections } from '../hooks/Collections'
  import { doc, updateDoc } from 'firebase/firestore'
  import { db } from '../firebase'
  import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    TextInput,
    Grid,
    Row,
    Column,
    TextArea,
    NumberInput,
    ImageLoader,
    Button,
    MultiSelect
  } from 'carbon-components-svelte'
  import Delete16 from 'carbon-icons-svelte/lib/Delete16'

  const dispatch = createEventDispatcher()

  const editBook = () => {
    const bookReference = doc(db, 'books', book.id)

    delete book.id
    updateDoc(bookReference, {
      ...book,
      lastModifiedDate: new Date()
    })
      .then(() => alert('Edytowano poprawnie'))
      .catch(() => alert('Wystąpił błąd 😢'))
  }

  let collections: CollectionsArray

  Collections.getAll()
    .then(response => collections = response)
    .catch(error => alert(error))
</script>

<ComposedModal bind:open on:close={() => dispatch('close')}>
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
            <div class="book__field"><NumberInput hideSteppers placeholder="ISBN" bind:value={book.isbn} /></div>
          </FormGroup>

          <FormGroup legendText="Okładka książki">
            <div class="book__field"><TextInput placeholder="URL okładki" bind:value={book.thumbnail} /></div>
          </FormGroup>

          <FormGroup>
            <div class="book__field">
              <MultiSelect
                titleText="Kolekcje"
                placeholder="Znajdź i dodaj kolekcję..."
                items={collections}
                bind:selectedIds={book.collections}
                spellcheck="false"
                filterable
              />
            </div>
          </FormGroup>

          <FormGroup legendText="Szczegóły">
            <div class="book__field"><NumberInput hideSteppers placeholder="Rok publikacji" bind:value={book.publishedAt} /></div>
            <div class="book__field"><NumberInput hideSteppers placeholder="Liczba stron" bind:value={book.pages} /></div>
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
  <ModalFooter>
    <Button kind="danger-ghost" icon={Delete16} on:click={() => dispatch('delete')}>Usuń z biblioteki</Button>
    <Button kind="secondary" on:click={() => dispatch('cancel')}>Anuluj</Button>
    <Button kind="primary" on:click={() => editBook()}>Zapisz zmiany</Button>
  </ModalFooter>
</ComposedModal>