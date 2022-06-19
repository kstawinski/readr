<script lang="ts">
  export let title: string
  export let hideUtilities: boolean

  import { createEventDispatcher } from 'svelte'
  import {
    Header,
    SkipToContent,
    HeaderUtilities,
    HeaderSearch,
    HeaderGlobalAction,
    OverflowMenu,
    OverflowMenuItem,
    ImageLoader
  } from 'carbon-components-svelte'
  import { Add, SettingsAdjust } from 'carbon-icons-svelte'
  import { navigate } from 'svelte-routing'

  let isSideNavOpen = false
  let searchValue: string

  const dispatch = createEventDispatcher()

  // LOGOUT
  import { Store } from '../hooks/Store'

  const user = {
    name: Store.getItem('name'),
    email: Store.getItem('email'),
    photo: Store.getItem('photo')
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }
</script>

<Header platformName={ "" || title } bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  
  <HeaderUtilities>
    {#if !hideUtilities}
      <HeaderGlobalAction
        aria-label="Dodaj nową książkę"
        icon={Add}
        on:click={ () => navigate('/search') }
      />

      <HeaderGlobalAction
        aria-label="Ustawienia sortowania"
        icon={SettingsAdjust}
        on:click={ () => dispatch('open-sorting-modal') }
      />

      <HeaderSearch
        class="header__search"
        placeholder="Czego szukasz?"
        bind:value={ searchValue }
        on:input={ () => dispatch('search', searchValue) }
        on:clear={ () => dispatch('search', '') }
      />
    {/if}

    <OverflowMenu style="width: auto;" flipped>
      <div slot="menu" class="header__photo">
        <ImageLoader fadeIn src={user.photo} />
      </div>

      <OverflowMenuItem
        text="Wyloguj się"
        on:click={ () => logout() }
      />
    </OverflowMenu>
  </HeaderUtilities>
</Header>

<style lang="scss" global>
  :global(a.bx--header__name) {
    font-size: 0.95rem !important;
    font-weight: 600 !important;
  }

  :global([role="search"].active) {
    width: 90vw !important;
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

  .header__photo {
    margin: 0 10px;
    > img {
      max-width: 24px;
      max-height: 24px;
      border-radius: 50px;
    }
  }
</style>