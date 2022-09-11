<script lang="ts">
  import { Tile } from 'carbon-components-svelte'
  import Rating from './Rating.svelte'
  import { polishPlurals } from 'polish-plurals'

  export let books: BooksArray

  let getRatedBooksCounting = 0
  const calculateAverageRating = (booksArr) => {
    let initialValue = 0

    let sum = booksArr.reduce((a: any, book: Book) => {
      return a + book.rate
    }, initialValue)

    getRatedBooksCounting = booksArr.filter(bookItem => bookItem.rate > 0).length

    return (sum / getRatedBooksCounting).toFixed(2)
  }

  const ratingLabel = polishPlurals.bind(null, 'ocena', 'oceny', 'ocen')
</script>

<div class="avRating">
  <Tile>
    <div class="avRating__flex">
      <div>Średnia ocena serii:</div>

      <div class="avRating__flex">
        <Rating rate={Number(calculateAverageRating(books))} />

        <span class="avRating__counter">
          ({getRatedBooksCounting} {ratingLabel(getRatedBooksCounting)})
        </span>
      </div>
    </div>
  </Tile>
</div>

<style lang="scss" global>
  .avRating {
    margin: 15px 0;

    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__counter {
      padding-left: 4px;
    }
  }
</style>