import { extendObservable, action } from 'mobx';
import bookStore from './book-store';

class ViewState {
  jdUrlPattern = /^http[s]?:\/\/item\.jd\.com\/\w+\.html/;
  BOOK_LIST_ORDER_LIKE = 'BOOK_LIST_ORDER_LIKE';
  BOOK_LIST_ORDER_PRICE = 'BOOK_LIST_ORDER_PRICE';

  constructor() {
    extendObservable(this, {
      urlFieldValue: '',
      urlFieldErrorText: '',
      searchDialogOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      localVotes: [],
      scrollY: 0,
      bookListOrder: '',

      urlFieldValid: () => {
        const url = this.urlFieldValue.trim();
        return this.jdUrlPattern.test(url);
      },
    });

    this.getLocalVotes();
  }

  handleUrlFieldChange = action('change-url-field', e => {
    this.urlFieldValue = e.target.value;
    this.checkUrlField();
  });

  clearUrlField = action('clear-url-field', () => {
    this.urlFieldValue = '';
    this.urlFieldErrorText = '';
  });

  checkUrlField = action('check-url-field', () => {
    const url = this.urlFieldValue.trim();

    if (!url || this.urlFieldValid) {
      this.urlFieldErrorText = '';
      return true;
    }

    this.urlFieldErrorText = 'Invalid JD.com URL';
    return false;
  });

  handleSnackbarOpen = action('open-snack-bar', () => {
    this.snackbarOpen = true;
  });

  handleSnackbarClose = action('close-snack-bar', () => {
    this.snackbarOpen = false;
  });

  setSnackbarMessage = action('set-snack-bar-message', message => {
    this.snackbarMessage = message;
  });

  handleSearchDialogOpen = action('open-search-dialog', () => {
    this.searchDialogOpen = true;
  });

  handleSearchDialogClose = action('close-search-dialog', () => {
    this.searchDialogOpen = false;
    bookStore.currentBook = null;
  });

  getLocalVotes = action('get-local-votes', () => {
    this.localVotes = JSON.parse(localStorage.getItem('local-votes')) || [];
  });

  setLocalVotes = action('set-local-votes', (votes) => {
    this.localVotes = votes;
    localStorage.setItem('local-votes', JSON.stringify(this.localVotes));
  });

  handleScroll = action('scroll', e => {
    this.scrollY = window.scrollY;
  });

  sortBookListByLike = action('sort-book-by-like', e => {
    this.bookListOrder = this.BOOK_LIST_ORDER_LIKE;
  });

  sortBookListByPrice = action('sort-book-by-price', e => {
    this.bookListOrder = this.BOOK_LIST_ORDER_PRICE;
  })
}

export default new ViewState();
