<script lang="ts">
  const PAGE_TITLE: string = 'Lista kolekcji'

  // import { navigate } from 'svelte-routing'
  import { onMount } from 'svelte'
  import {
    InlineLoading,
    Content,
    Tile
  } from 'carbon-components-svelte'
  import { Collections } from '../hooks/Collections'
  import Header from '../lib/Header.svelte'

  let collections: CollectionsArray = []

  const fetchCollections = () => {
    Collections.getAll()
      .then(response => {
        collections = response
      })
  }

  onMount(() => fetchCollections())
</script>

<main>
  <Header title={PAGE_TITLE} />

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
</main>

<style lang="scss" global>
  .collections {
    &__tile {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
</style>