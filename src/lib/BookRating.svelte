<script lang="ts">
  export let value: number

  import StarFilled24 from 'carbon-icons-svelte/lib/StarFilled24'
</script>

<div class="rating">
  {#each [...Array(value)] as rating}
    <StarFilled24 />
  {/each}

  <div class="rating__value">{ value }/5</div>
</div>

<style lang="scss">
  .rating {
    display: flex;
    align-items: center;

    &__value {
      margin-left: 5px;
      font-weight: 600;
    }
  }
</style>