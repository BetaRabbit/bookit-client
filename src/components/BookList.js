import React from 'react';
import { observer } from 'mobx-react';

import Book from './Book';

function BookList(props) {
  if (!props.books.length) {
    return <h2 className="book-list-message">No books here, try to add some?</h2>
  }
  return <div>
    {props.books.map(book => <Book key={book.id} book={book} />)}
  </div>
}

export default observer(BookList);
