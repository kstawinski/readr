<script lang="ts">
  export let rate: number

  import StarFilled from 'carbon-icons-svelte/lib/StarFilled.svelte'
</script>

<div class="rating">
  <div>
    <StarFilled size={16} class="rating__icon" />
  </div>

  <div class="rating__value">
    { rate.toLocaleString() }
  </div>
</div>

<style lang="scss">
  .rating {
    display: flex;
    align-items: center;

    &__value {
      font-weight: 600;
      margin-left: 5px;
    }
  }

  :global(.rating__icon) {
    width: 12px;
  }
</style>