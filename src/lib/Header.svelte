<script lang="ts">
  export let title: string

  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    SkipToContent
  } from 'carbon-components-svelte'
  import { navigate } from 'svelte-routing'
  import ProfileBar from '../lib/ProfileBar.svelte'
  import Modal from '../lib/Modal.svelte'
  import AddModal from '../lib/AddModal.svelte'

  let isSideNavOpen = false
  let isAddModalOpen = false

  const logout = () => {
    localStorage.clear()
    navigate('/login', { replace: true })
  }
</script>

<AddModal
  label="Nowa książka" title="Dodaj przez ISBN"
  open={ isAddModalOpen }
  on:close={ () => isAddModalOpen = false }
/>

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
      on:click={ () => isAddModalOpen = true }
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
