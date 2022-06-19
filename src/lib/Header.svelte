<script lang="ts">
  export let title: string
  export let hideUtilities: boolean

  import { beforeUpdate, createEventDispatcher } from 'svelte'
  import {
    Header,
    SkipToContent,
    HeaderUtilities,
    HeaderSearch,
    HeaderGlobalAction,
OverflowMenu,
OverflowMenuItem,
Dropdown
  } from 'carbon-components-svelte'
  import { Add, SettingsAdjust } from 'carbon-icons-svelte';
import { navigate } from 'svelte-routing';

  let isSideNavOpen = false
  let searchValue: string

  const dispatch = createEventDispatcher()

  // Clear the style if empty string
	// beforeUpdate (() => {
	// 	hideUtilities = hideUtilities || undefined
	// })
</script>

<Header platformName={ "" || title } bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>

  {#if !hideUtilities}
  <HeaderUtilities>
    <!-- <HeaderGlobalAction>
      <OverflowMenu flipped icon={Add}>
        <OverflowMenuItem text="Manage credentials" />
        <OverflowMenuItem
          href="https://cloud.ibm.com/docs/api-gateway/"
          text="API documentation"
        />
        <OverflowMenuItem danger text="Delete service" />
      </OverflowMenu>

    </HeaderGlobalAction> -->
      <!-- aria-label="Dodaj ksiażkę"
      icon={Add}
      on:click={() => dispatch('open-add-modal')}
    /> -->

    <OverflowMenu style="width: auto;" flipped open>
      <div slot="menu" class="bx--header__action">
        <HeaderGlobalAction
          aria-label="Dodaj nową książkę"
          icon={Add}
        />
      </div>
      <OverflowMenuItem
        text="Szukaj książki..."
        on:click={ () => navigate('/search') }
      />
      <OverflowMenuItem text="Wprowadź ISBN" />
    </OverflowMenu>

    <HeaderGlobalAction
      aria-label="Ustawienia sortowania"
      icon={SettingsAdjust}
      on:click={() => dispatch('open-sorting-modal')}
    />

    <HeaderSearch
      class="header__search"
      placeholder="Czego szukasz?"
      bind:value={ searchValue }
      on:input={ () => dispatch('search', searchValue) }
      on:clear={ () => dispatch('search', '') }
    />
  </HeaderUtilities>
  {/if}
</Header>

<style>
  :global(a.bx--header__name) {
    font-size: 0.95rem !important;
    font-weight: 600 !important;
  }

  :global([role="search"].active) {
    width: 100vw !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    background-color: #161616 !important;
    margin-left: 0 !important;
  }

  :global([role="search"]) {
    margin-left: 0 !important;
  }

  :global(.bx--header__action) {
    background: none !important;
  }

  :global(.bx--overflow-menu) {
    width: auto !important;
    height: auto !important;
  }

  :global(.bx--overflow-menu:hover) {
    background: transparent !important;
  }
</style>