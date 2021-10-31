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
    TextInput
  } from 'carbon-components-svelte'
  import FolderAdd16 from 'carbon-icons-svelte/lib/FolderAdd16'
  import { Collections } from '../hooks/Collections'
  import Header from '../lib/Header.svelte'

  let collections: CollectionsArray = []
  let isAddModalVisible = false
  let collectionName = ''

  const fetchCollections = () => {
    Collections.getAll()
      .then(response => {
        collections = response
      })
  }

  onMount(() => fetchCollections())

  const addCollection = (name: string) => {
    Collections.create(name)
      .then(() => {
        fetchCollections()
        isAddModalVisible = false
      })
      .catch(error => console.error(error))
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
    {#each collections as collection}
      <Tile class="collections__tile">
        { collection.text }
      </Tile>
    {:else}
      <div class="loader">
        <InlineLoading />
      </div>
    {/each}
  </Content>

  <div class="collections__footer">
    <Button
      icon={FolderAdd16}
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
  }
</style>