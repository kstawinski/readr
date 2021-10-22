<script lang="ts">
  export let rate: number

  import StarFilled16 from 'carbon-icons-svelte/lib/StarFilled16'
</script>

<div class="rating">
  <div>
    <StarFilled16 class="rating__icon" />
  </div>

  <div class="rating__value">
    { rate }
  </div>
</div>

<style>
  .rating {
    display: flex;
    align-items: center;
  }

  .rating__value {
    font-weight: 600;
    margin-left: 5px;
    /* font-size: 12px; */
  }

  :global(.rating__icon) {
    width: 12px;
  }
</style>