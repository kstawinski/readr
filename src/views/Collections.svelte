<script lang="ts">
  const PAGE_TITLE: string = 'Lista kolekcji'

  // import { navigate } from 'svelte-routing'
  import { onMount } from 'svelte'
  import {
    InlineLoading,
    Content,
    Tile,
    Button,
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TextInput,
    OrderedList,
    ListItem
  } from 'carbon-components-svelte'
  import FolderAdd from 'carbon-icons-svelte/lib/FolderAdd.svelte'
  import { Books } from '../hooks/Books'
  import { Collections } from '../hooks/Collections'
  import Header from '../lib/Header.svelte'
  import { Link } from 'svelte-routing'

  let books: BooksArray = []
  let collections: CollectionsArray = []
  let isAddModalVisible = false
  let collectionName = ''

  const fetchBooks = () => {
    Books.getAllBooks()
      .then(response => {
        books = response
      })
  }

  const fetchCollections = () => {
    Collections.getAll()
      .then(response => {
        collections = response
      })
  }

  onMount(() => {
    fetchBooks()
    fetchCollections()
  })

  const addCollection = (name: string) => {
    Collections.create(name)
      .then(() => {
        fetchCollections()
        isAddModalVisible = false
      })
      .catch(error => console.error(error))
  }

  const collectionFilter = (id: string) => books.filter(book => (book.collections || []).includes(id))
</script>

<main>
  <Header title={PAGE_TITLE} />

  {#if isAddModalVisible}
  <ComposedModal bind:open={isAddModalVisible}>
    <ModalHeader title="Nowa kolekcja" />
    <ModalBody hasForm>
      <TextInput
        size="xl"
        hideLabel
        placeholder="Wprowadź nazwę kolekcji..."
        bind:value={collectionName}
      />
    </ModalBody>
    <ModalFooter>
      <Button kind="secondary">Anuluj</Button>
      <Button
        kind="primary"
        disabled={!(collectionName.length > 3)}
        on:click={() => addCollection(collectionName)}
      >Dodaj kolekcję</Button>
    </ModalFooter>
  </ComposedModal>
  {/if}

  <Content>
    {#each collections as collection}
      <Tile class="collections__tile">
        <div class="collections__title">{ collection.text }</div>

        <OrderedList class="collections__list">
          {#each collectionFilter(collection.id) as book}
            <ListItem>
              <Link to={`/book/${book.id}`}>
                { book.title } ({ book.author })
              </Link>
            </ListItem>
          {/each}
        </OrderedList>
      </Tile>
    {:else}
      <div class="loader">
        <InlineLoading />
      </div>
    {/each}
  </Content>

  <div class="collections__footer">
    <Button
      icon={FolderAdd}
      kind="secondary"
      on:click={ () => isAddModalVisible = true }
    >Utwórz nową kolekcję</Button>
  </div>
</main>

<style lang="scss" global>
  .collections {
    &__tile {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
    &__footer {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20px;
      width: 100%;
      /* z-index pulls the menu to the top on desktop devices */
      z-index: 9000;
    }
    &__title {
      font-weight: 600;
    }
    &__list {
      margin: 15px 0 0 30px;
    }
  }
</style>