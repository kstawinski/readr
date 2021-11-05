<script lang="ts">
  export let tooltip: string
  export let icon
  export let value: string|number = ''

  import { Column, TooltipIcon } from 'carbon-components-svelte'
</script>

<Column>
  <div class="meta">
    <div class="meta__icon">
      <TooltipIcon
        tooltipText={tooltip}
        icon={icon}
      />
    </div>
    <div class="meta__value">
      <slot></slot>

      { value }
    </div>
  </div>
</Column>

<style lang="scss">
  .meta {
    display: flex;
    align-items: center;

    &__value {
      margin-left: 5px;
      font-weight: 600;
    }
  }
</style>