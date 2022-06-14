<script lang="ts">
import { Button, TooltipIcon } from 'carbon-components-svelte';
import { Logout } from 'carbon-icons-svelte';
import { navigate } from 'svelte-routing';

  import { Store } from '../hooks/Store'

  const user = {
    name: Store.getItem('name'),
    email: Store.getItem('email'),
    photo: Store.getItem('photo')
  }

  const logout = () => {
    localStorage.clear()
    navigate('/login', { replace: true })
  }
</script>

<div class="user user__flex">
  <div class="user__flex">
    <img src={ user.photo } alt={ user.name } class="user__photo">
    <div>{ user.name }</div>
  </div>

  <Button
    icon={Logout} kind="danger-ghost"
    on:click={ () => logout() }
  >
    Wyloguj się
  </Button>
</div>

<style lang="scss">
  .user {
    padding: 1rem ;
    border-top: 1px solid #E7E7E5;

    &__photo {
      margin-right: 10px;
      width: 24px;
      border-radius: 30px;
    }
    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>