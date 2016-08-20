import { extendObservable, action } from 'mobx';

import { search } from '../api/book-api';

class BookStore {
  constructor() {
    extendObservable(this, {
      currentBook: null,
      error: null,
      loading: false,
    });
  }

  searchBook = action('search-book', url => {
    this.loading = true;
    search({ url })
      .then(action('search-book-success', bookData => {
        this.loading = false;
        this.currentBook = bookData;
        this.error = null;
      }))
      .catch(action('search-book-failure', error => {
        this.loading = false;
        this.error = error;
      }));
  });
}

export default new BookStore();
