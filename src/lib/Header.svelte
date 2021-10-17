<script lang="ts">
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

  export let title: string

  const logout = () => {
    localStorage.clear()
    navigate('/login', { replace: true })
  }
</script>

<Header platformName="{ title }" bind:isSideNavOpen>
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
