<script lang="ts">
  import { Information } from 'carbon-icons-svelte'
  export let message: string
</script>

<div class="information">
  <Information />

  <p class="information__message">
    { message }
  </p>
</div>

<style lang="scss" global>
  .information {
    opacity: 0.5;
    margin: 15px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &__message {
      width: 97%;
      font-size: 14px;
      line-height: 1.35;
      margin-left: 10px;
    }
  }
</style>