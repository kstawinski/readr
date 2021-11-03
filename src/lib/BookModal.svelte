<script lang="ts">
  export let book: Book
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import Modal from '../lib/Modal.svelte'
  import {
    ImageLoader,
    InlineLoading,
    InlineNotification,
    Content,
    Button,
    Grid,
    Row,
    Column,
    TooltipIcon
  } from 'carbon-components-svelte'
  import StarFilled24 from 'carbon-icons-svelte/lib/StarFilled24'
  import Book20 from 'carbon-icons-svelte/lib/Book20'
  import Time20 from 'carbon-icons-svelte/lib/Time20'
  import Calendar20 from 'carbon-icons-svelte/lib/Calendar20'

	const dispatch = createEventDispatcher()

  const closeModal = () => {
    // open = false
    dispatch('close')
  }

  const formatDate = (timestampSeconds, monthLength = 'short') => {
    const options = {
      year: 'numeric',
      month: monthLength,
      day: 'numeric'
    }
    
    const date = new Date(timestampSeconds * 1000)

    return date.toLocaleDateString('pl-PL', options)
  }
</script>

<Modal {open} label={ book.author } title={ book.title } on:close={ () => closeModal() }>
  <svelte:fragment slot="content">
    <Row>
      <Column md={2} noGutterLeft>
        <ImageLoader src={ book.thumbnail }>
          <div slot="loading">
            <InlineLoading />
          </div>
          <div slot="error">An error occurred.</div>
        </ImageLoader>
      </Column>

      <Column md={6} class="book">
        <div class="book__group">
          {#if book.description}
            <p class="book__description">{ book.description }</p>
          {:else}
            <InlineNotification
              kind="info"
              subtitle="Nie podano opisu dla tej książki."
            />
          {/if}

          {#if book.rate}
            <div class="book__rating">
              {#each [...Array(book.rate)] as rating}
                <StarFilled24 />
              {/each}

              <div class="book__ratingValue">{ book.rate }/5</div>
            </div>
          {/if}
        </div>

        <div class="book__group">
          <Row>
            <!-- year -->
            {#if book.publishedAt}
              <Column>
                <div class="book__meta">
                  <div class="book__metaIcon">
                    <TooltipIcon
                      tooltipText="Rok publikacji"
                      icon={Calendar20}
                    />
                  </div>
                  <div class="book__metaValue">
                    { book.publishedAt }
                  </div>
                </div>
              </Column>
            {/if}

            <!-- pages -->
            {#if book.pages}
              <Column>
                <div class="book__meta">
                  <div class="book__metaIcon">
                    <TooltipIcon
                      tooltipText="Liczba stron"
                      icon={Book20}
                    />
                  </div>
                  <div class="book__metaValue">
                    { book.pages }
                  </div>
                </div>
              </Column>
            {/if}

            <!-- time add -->
            {#if book.addDate}
              <Column>
                <div class="book__meta">
                  <div class="book__metaIcon">
                    <TooltipIcon
                      tooltipText="Data dodania"
                      icon={Time20}
                    />
                  </div>
                  <div class="book__metaValue">
                    { formatDate(book.addDate.seconds) }
                  </div>
                </div>
              </Column>
            {/if}
          </Row>
        </div>

        <p class="book__caption">
          ISBN { book.isbn }
          {#if book.lastModifiedDate}
            • Ostatnia edycja { formatDate(book.lastModifiedDate.seconds, 'long') }
          {/if}
        </p>
      </Column>
    </Row>
  </svelte:fragment>

  <svelte:fragment slot="footer">
    <Button kind="secondary" on:click={() => dispatch('edit')}>Edytuj książkę</Button>
  </svelte:fragment>
</Modal>

<style lang="scss">
  .book {
    padding: 20px;

    &__caption {
      font-size: small;
      color: gray;
    }
    &__thumbnail {
      width: 50%;
      max-width: 220px;
      margin: 20px auto;
      display: block;
    }
    &__meta {
      display: flex;
      align-items: center;
    }
    &__rating {
      display: flex;
      align-items: center;
    }
    &__group {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
    &__metaValue, &__ratingValue {
      margin-left: 5px;
      font-weight: 600;
    }
    &__title {
      font-size: 2.25em;
      margin-bottom: 10px;
    }
    &__author {
      font-size: 1.25em;
    }
    &__description {
      margin-bottom: 15px;
    }
  }

  :global(.book__field) {
    margin-bottom: 5px;
  }
</style>
