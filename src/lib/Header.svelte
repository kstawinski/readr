<script lang="ts">
  export let title: string

  import { createEventDispatcher } from 'svelte'
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent
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

<Header platformName={ title } bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
</Header>

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
