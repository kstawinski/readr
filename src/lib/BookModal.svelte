<script lang="ts">
  export let book: Book
  export let collections: CollectionsArray
  export let open: boolean

  import { createEventDispatcher } from 'svelte'
  import Modal from '../lib/Modal.svelte'
  import {
    ImageLoader,
    InlineLoading,
    InlineNotification,
    Button,
    Row,
    Column,
    Tag
  } from 'carbon-components-svelte'
  import Book from 'carbon-icons-svelte/lib/Book.svelte'
  import Time from 'carbon-icons-svelte/lib/Time.svelte'
  import Calendar from 'carbon-icons-svelte/lib/Calendar.svelte'
  import Folder from 'carbon-icons-svelte/lib/Folder.svelte'
  import BookInfo from '../lib/BookInfo.svelte'
  import BookRating from '../lib/BookRating.svelte'

	const dispatch = createEventDispatcher()

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

<Modal
  {open}
  label={ book.author }
  title={ book.title }
  on:close={ () => dispatch('close') }
>
  <svelte:fragment slot="content">
    <Row>
      <Column sm={{ span: 2, offset: 1 }} md={{ span: 2, offset: 0 }} noGutterLeft>
        <ImageLoader src={ book.thumbnail }>
          <div slot="loading">
            <InlineLoading />
          </div>
          <div slot="error">An error occurred.</div>
        </ImageLoader>
      </Column>

      <Column sm={12} md={6} class="book">
        <div class="book__group">
          {#if book.description}
            <p class="book__description">{ book.description }</p>
          {:else}
            <InlineNotification
              hideCloseButton
              kind="info"
              subtitle="Nie dodano notatki dla tej książki."
            />
          {/if}

          {#if book.rate}
            <BookRating value={book.rate} />
          {/if}
        </div>

        <div class="book__group">
          <Row>
            <!-- Publication year -->
            {#if book.publishedAt}
              <BookInfo
                tooltip="Rok publikacji"
                icon={Calendar}
                value={book.publishedAt}
              />
            {/if}

            <!-- Pages -->
            {#if book.pages}
              <BookInfo
                tooltip="Liczba stron"
                icon={Book}
                value={book.pages}
              />
            {/if}

            <!-- Add time -->
            {#if book.addDate}
              <BookInfo
                tooltip="Data dodania"
                icon={Time}
                value={formatDate(book.addDate.seconds)}
              />
            {/if}
          </Row>

          <!-- Collections -->
          {#if ( book.collections || [] ).length > 0}
            <Row>
              <BookInfo
                tooltip="Przypisane kolekcje"
                icon={Folder}
              >
                {#each collections.filter(collectionItem => book.collections.includes(collectionItem.id)) as collection}
                  <Tag>{ collection.text }</Tag>
                {/each}
              </BookInfo>
            </Row>
          {/if}
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

    &__image {
      border-radius: 4px;
    }
    &__caption {
      font-size: small;
      color: gray;
    }
    &__group {
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
    &__description {
      margin: 25px 0;
      line-height: 1.5;
    }
  }

  // Fix book description width
  :global(.bx--modal-content p) {
    padding-right: 0 !important;
  }
</style>
