<script lang="ts">
  import { Store } from '../hooks/Store'

  const user = {
    name: Store.getItem('name'),
    email: Store.getItem('email'),
    photo: Store.getItem('photo')
  }
</script>

<div class="user">
  <img src={ user.photo } alt={ user.name } class="user__photo">
  <div>{ user.name }</div>
</div>

<style lang="scss">
  .user {
    padding: 1rem 1rem 0.5rem 1rem;
    display: flex;
    align-items: center;
    margin-top: 20px;
    border-top: 1px solid #E7E7E5;

    &__photo {
      margin-right: 10px;
      width: 24px;
      border-radius: 30px;
    }
  }
</style>