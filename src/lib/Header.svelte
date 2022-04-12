<script lang="ts">
  export let title: string

  import { createEventDispatcher } from 'svelte'
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent,
    HeaderUtilities,
    HeaderSearch
  } from 'carbon-components-svelte'
  import { navigate } from 'svelte-routing'
  import ProfileBar from '../lib/ProfileBar.svelte'

  let isSideNavOpen = false

  const dispatch = createEventDispatcher()

  const logout = () => {
    localStorage.clear()
    navigate('/login', { replace: true })
  }
</script>

<Header platformName={ "" || title } bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderSearch
      placeholder="Search services"
    />
  </HeaderUtilities>
</Header>

<!-- <SiteHeader {title} /> -->

<SideNav bind:isOpen={ isSideNavOpen }>
  <SideNavItems>
    <SideNavLink
      text="Biblioteka"
      on:click={ () => navigate('/') }
    />

    <SideNavLink
      text="Dodaj książkę"
      on:click={ () => dispatch('open-add-modal') }
    />

    <SideNavLink
      text="Lista kolekcji"
      on:click={ () => navigate('/collections') }
    />

    <ProfileBar />

    <SideNavLink
      text="Wyloguj się"
      on:click={ () => logout() }
    />
  </SideNavItems>
</SideNav>

<style>
  :global(a.bx--header__name) {
    font-size: 0.95rem !important;
    font-weight: 600 !important;
  }

  :global([role="search"].s-qIO5oRXzFdSn.s-qIO5oRXzFdSn.active) {
    width: 100vw !important;
    margin-left: 0;
    position: absolute;
    top: 0;
    left: 0;
    border: 0 !important;
    outline: 0 !important;
    background-color: #161616;
  }

  :global(.bx--header__action) {
    background: none !important;
  }
</style>