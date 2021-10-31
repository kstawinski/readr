<script lang="ts">
  const PAGE_TITLE: string = 'Lista kolekcji'

  import { onMount } from 'svelte'
  import {
    InlineLoading,
    Content
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
      { collection.text }
    {:else}
      <div class="loader">
        <InlineLoading />
      </div>
    {/each}
  </Content>
</main>
