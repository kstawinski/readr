<script lang="ts">
  const PAGE_TITLE: string = 'Biblioteka'

  import { Books } from '../hooks/Books'
  import { Collections } from '../hooks/Collections'
  import Header from '../lib/Header.svelte'
  import Book from '../lib/Book.svelte'
  import SortingModal from '../lib/SortingModal.svelte'
  import AddModal from '../lib/AddModal.svelte'
  import Information from '../lib/Information.svelte'
  import { Button, ComposedModal, Content, InlineLoading, ModalBody, ModalFooter, ModalHeader, Tag, TextInput } from 'carbon-components-svelte'
  import { Add, CollapseAll } from 'carbon-icons-svelte'

  let books: BooksArray = []
  let booksUnmodifiedArray: BooksArray = []
  let collections: CollectionsArray = []
  let isLoading = true
  let isSortingVisible = false
  let isAddModalVisible = false

  const fetchData = () => {
    Books.getAllBooks()
      .then(booksArr => {
        books = booksArr
        booksUnmodifiedArray = booksArr
        updateSort({ method: 'editDes', isRatingRequired: false })

        Collections.getAll().then(collectionsArr => {
          collections = collectionsArr
          isLoading = false
        })
      })
  }

  const updateSort = (options: SortingOptions) => {
    isSortingVisible = false
    // reset "filter by category"
    collectionID = ''

    const booksArray = options.isRatingRequired ?
      booksUnmodifiedArray.filter(book => book.rate)
      : booksUnmodifiedArray

    switch (options.method) {
      case 'title':
        books = booksArray.sort((a, b) => a.title.localeCompare(b.title))
        break;
      case 'author':
        books = booksArray.sort((a, b) => a.author.localeCompare(b.author))
        break;
      case 'ratingAsc':
        books = booksArray.sort((a, b) => a.rate - b.rate)
        break;
      case 'ratingDes':
        books = booksArray.sort((a, b) => b.rate - a.rate)
        break;
      case 'addAsc':
        books = booksArray.sort((a, b) => Number(a.addDate) - Number(b.addDate))
        break;
      case 'addDes':
        books = booksArray.sort((a, b) => Number(b.addDate) - Number(a.addDate))
        break;
      case 'editAsc':
        books = booksArray.sort((a, b) => Number(a.lastModifiedDate) - Number(b.lastModifiedDate))
        break;
      case 'editDes':
        books = booksArray.sort((a, b) => Number(b.lastModifiedDate) - Number(a.lastModifiedDate))
        break;
      default:
        // sort by title
        books = booksArray.sort((a, b) => a.title.localeCompare(b.title))
        break;
    }
  }

  const removeBookFromArray = (id: string) => books = books.filter(book => book.id !== id)

  const useSearch = (keyword: string): void => {
    if (keyword.length > 2) {
      // reset "filter by category"
      collectionID = ''

      const searchValue = keyword.toLowerCase()
      books = booksUnmodifiedArray.filter(book =>
        book.title.toLowerCase().includes(searchValue)
        || book.author.toLowerCase().includes(searchValue)
      )
    } else if (keyword.length === 0) { // on close field / delete value from input 
      books = booksUnmodifiedArray
    }
  }

  let collectionID = ''

  const filterByCollection = (collectionIdentifier: string) => {
    collectionID = collectionIdentifier

    if (collectionIdentifier) {
      books = booksUnmodifiedArray.filter(book => (book.collections || []).includes(collectionIdentifier))
    } else {
      books = booksUnmodifiedArray
    }
  }

  const createCollectionForm = {
    isModal: false,
    name: ''
  }

  const addCollection = (name: string) => {
    Collections.create(name)
      .then(() => {
        // fetchCollections()
        fetchData()
        isAddModalVisible = false
      })
      .catch(error => console.error(error))
  }

  fetchData()
</script>

<main>
  <Header
    title={PAGE_TITLE}
    hideUtilities={false}
    on:open-add-modal={ () => isAddModalVisible = true }
    on:open-sorting-modal={ () => isSortingVisible = true }
    on:search={ ({ detail }) => useSearch(detail) }
  />

  <AddModal
    label="Nowa książka" title="Dodaj przez ISBN"
    open={ isAddModalVisible }
    on:close={ () => isAddModalVisible = false }
    on:success={ () => fetchData() }
  />

  <SortingModal
    open={ isSortingVisible }
    on:close={ () => isSortingVisible = false }
    on:change={ ({ detail }) => updateSort(detail) }
  />

  {#if isLoading}
    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Content>
      <!-- collections list -->
      <div class="books__tags">
        {#each collections as collection}
          <Tag
            interactive
            on:click={ () => filterByCollection(collection.id) }
            type={ collectionID === collection.id ? 'high-contrast' : undefined }
          >{ collection.text }</Tag>
        {/each}

        <!-- show all tag -->
        <Tag
          interactive
          type={ collectionID === "" ? 'high-contrast' : 'outline' }
          icon={ CollapseAll }
          on:click={ () => filterByCollection("") }
        >Wszystkie ({ booksUnmodifiedArray.length })</Tag>

        <!-- new collection tag -->
        <Tag
          interactive
          type="outline"
          icon={Add}
          on:click={ () => createCollectionForm.isModal = true }
        >Utwórz kolekcję</Tag>
      </div>
  
      <!-- collections notification -->
      {#if !collectionID}
        <Information message="Aktualnie wyświetlasz wszystkie dodane pozycje. Wybierz kategorię, aby rozpocząć filtrowanie."/>
      {/if}

      <!-- books list -->
      <div class="books__list">
        {#each books as book (book.id)}
          <Book
            {book}
            collections={collections || []}
            on:delete={({ detail }) => removeBookFromArray(detail)}
            on:successEdit={ () => fetchData() }
          />
        {/each}
      </div>

      <!-- add collection modal -->
      {#if createCollectionForm.isModal}
      <ComposedModal bind:open={createCollectionForm.isModal}>
        <ModalHeader title="Nowa kolekcja" />
        <ModalBody hasForm>
          <TextInput
            size="xl"
            hideLabel
            placeholder="Wprowadź nazwę kolekcji..."
            bind:value={createCollectionForm.name}
          />
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary">Anuluj</Button>
          <Button
            kind="primary"
            disabled={!(createCollectionForm.name.length > 3)}
            on:click={() => addCollection(createCollectionForm.name)}
          >Dodaj kolekcję</Button>
        </ModalFooter>
      </ComposedModal>
      {/if}
    </Content>
  {/if}
</main>

<style lang="scss" global>
  .books {
    &__footer {
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20px;
      width: 100%;
      /* z-index pulls the menu to the top on desktop devices */
      z-index: 8000;
    }
    &__list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }
    &__tags {
      > button:first-child {
        margin: .25rem .25rem .25rem 0;
      }
    }
  }
</style>