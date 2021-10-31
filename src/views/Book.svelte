<script lang="ts">
  export let id: string

  import { Books } from '../hooks/Books'
  import {
    ImageLoader,
    InlineLoading,
    Content,
    Button,
    Grid,
    Row,
    Column
  } from 'carbon-components-svelte'
  import Header from '../lib/Header.svelte'
  import EditModal from '../lib/EditModal.svelte'
  import StarFilled24 from 'carbon-icons-svelte/lib/StarFilled24'
  import Book20 from 'carbon-icons-svelte/lib/Book20'
  import Time20 from 'carbon-icons-svelte/lib/Time20'
  import Calendar20 from 'carbon-icons-svelte/lib/Calendar20'

  let book: Book
  let isLoading = true
  let isEditModalVisible = false

  Books.getBook(id)
    .then(response => {
      book = response
      isLoading = false
    })

  const formatDate = (timestampSeconds) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    
    const date = new Date(timestampSeconds * 1000)

    return date.toLocaleDateString('pl-PL', options)
  }
</script>

<main>
  {#if isLoading}
    <Header title="" />

    <div class="loader">
      <InlineLoading />
    </div>
  {:else}
    <Header title={ book.title } />

    {#if isEditModalVisible}
      <EditModal
        {book}
        open={isEditModalVisible}
        on:close={() => isEditModalVisible = false}
      />
    {/if}

    <Content>
      <Grid>
        <Row>
          <Column md={2}>
            <ImageLoader src={ book.thumbnail }>
              <div slot="loading">
                <InlineLoading />
              </div>
              <div slot="error">An error occurred.</div>
            </ImageLoader>
          </Column>

          <Column md={6} class="book">
            <div class="book__group">
              <div class="book__title">{ book.title }</div>
              <div class="book__author">{ book.author }</div>
            </div>

            <div class="book__group">
              <p class="book__description">{ book.description }</p>

              <div class="book__rating">
                {#each [...Array(book.rate)] as rating}
                  <StarFilled24 />
                {/each}

                <div class="book__ratingValue">{ book.rate }/5</div>
              </div>
            </div>

            <div class="book__group">
              <Row>
                <!-- year -->
                <Column>
                  <div class="book__meta">
                    <div class="book__metaIcon">
                      <Calendar20 />
                    </div>
                    <div class="book__metaValue">
                      { book.publishedAt }
                    </div>
                  </div>
                </Column>
                
                <!-- pages -->
                <Column>
                  <div class="book__meta">
                    <div class="book__metaIcon">
                      <Book20 />
                    </div>
                    <div class="book__metaValue">
                      { book.pages }
                    </div>
                  </div>
                </Column>
                
                <!-- time add -->
                <Column>
                  <div class="book__meta">
                    <div class="book__metaIcon">
                      <Time20 />
                    </div>
                    <div class="book__metaValue">
                      { formatDate(book.addDate.seconds) }
                    </div>
                  </div>
                </Column>
              </Row>
            </div>

            <div class="book__group">
              <ul>
                <li>ISBN: { book.isbn }</li>
                <li>Edytowano: { formatDate(book.lastModifiedDate.seconds) }</li>
              </ul>
            </div>

            <div class="book__group">
              <Button kind="secondary" on:click={() => isEditModalVisible = true}>Edytuj książkę</Button>
            </div>
          </Column>
        </Row>
      </Grid>
    </Content>
  {/if}
</main>

<style lang="scss">
  .book {
    padding: 20px;

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