import React from 'react';
import { observer, inject } from 'mobx-react';

import Book from './Book';

function BookList(props) {
  const { viewState, books } = props;
  if (!books.length) {
    return <h2 className="book-list-message">No books here, try to add some?</h2>
  }


  if (viewState.bookListOrder === viewState.BOOK_LIST_ORDER_LIKE) {
    return (
      <div>
        {books.sort((a, b) => (b.votes.length - a.votes.length))
          .map(book => <Book key={book.id} book={book} />)}
      </div>
    );
  }

  if (viewState.bookListOrder === viewState.BOOK_LIST_ORDER_PRICE) {
    return (
      <div>
        {books.sort((a, b) => (parseFloat(b.price) - parseFloat(a.price)))
          .map(book => <Book key={book.id} book={book} />)}
      </div>
    );
  }

  return (
    <div>
      {books.map(book => <Book key={book.id} book={book} />)}
    </div>
  );
}

export default inject(
  'viewState'
)(observer(BookList));
