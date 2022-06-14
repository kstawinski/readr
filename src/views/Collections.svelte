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
    ListItem,
Tag,
Row
  } from 'carbon-components-svelte'
  import FolderAdd from 'carbon-icons-svelte/lib/FolderAdd.svelte'
  import { Books } from '../hooks/Books'
  import { Collections } from '../hooks/Collections'
  import Header from '../lib/Header.svelte'
  import { Link } from 'svelte-routing'
  import Book from '../lib/Book.svelte'
import { Information } from 'carbon-icons-svelte'

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

  let collectionID = '';

  const filterByCollection = (id: string) => {
    collectionID = id;

    if (id) {
      return books.filter(book => (book.collections || []).includes(id));
    } else {
      return books;
    }
  }
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
    <div class="collections__tags">
      {#each collections as collection}
        <Tag interactive on:click={() => filterByCollection(collection.id) }>{ collection.text }</Tag>
      {:else}
        <div class="loader">
          <InlineLoading />
        </div>
      {/each}
    </div>

    {#if !collectionID}
    <div class="collections__hintBlock">
      <Information/>

      <p class="collections__hint">
        Aktualnie wyświetlasz wszystkie dodane pozycje.
        Wybierz kategorię, aby rozpocząć filtrowanie.
      </p>
    </div>
    {/if}

    <!-- books -->
    <div class="collections__books">
      {#each filterByCollection(collectionID) as book (book.id)}
        <Book
          {book}
          {collections}
        />
      {/each}
    </div>
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
    &__tags {
      > button:first-child {
        margin: .25rem .25rem .25rem 0;
      }
    }
    &__hintBlock {
      opacity: 0.5;
      margin-top: 15px;
      display: flex;
      align-items: flex-start;

      > svg {
        width: 70px;
      }
    }
    &__hint {
      font-size: 14px;
      line-height: 1.35;
    }
    &__books {
      margin-top: 30px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 15px;
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