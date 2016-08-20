import React from 'react';
import { observer, inject } from 'mobx-react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import Book from './Book';

const css = {
  progress: {
    left: '40%',
  }
};

function SearchDialog(props) {
  const { viewState, bookStore } = this.props;
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={viewState.handleSearchDialogClose}
    />,
    <FlatButton
      label="Add"
      primary={true}
      disabled={!bookStore.currentBook}
      onTouchTap={handleAddClick(props)}
    />,
  ];
  let title = 'Getting book';

  if (!bookStore.loading) {
    if (bookStore.error) {
      title = 'Get book failed'
    } else {
      title = 'Is this your book?'
    }
  }

  return (
    <Dialog
      title={title}
      actions={actions}
      modal={true}
      open={viewState.searchDialogOpen}
    >
      {bookStore.loading ? renderLoading() : renderDialogContent(bookStore)}
    </Dialog>
  );
}

function renderLoading() {
  return (
    <CircularProgress
      mode="indeterminate"
      size={2}
      style={css.progress}
    />
  );
}

function handleAddClick(props) {
  return e => {
    const { viewState, bookStore, voteSessionStore } = props;
    voteSessionStore.voteBook(voteSessionStore.currentVoteSession.id, bookStore.currentBook.id);
    viewState.handleSearchDialogClose();
    viewState.clearUrlField();
  };
}

function renderError(error) {
  return (
    <div>
      <h3>Failed to get your book...</h3>
      <p>{error.message}</p>
    </div>
  );
}

function renderBook(book) {
  if (book) {
    return <Book book={book} hideAction />;
  }

  return null;
}

function renderDialogContent(bookStore) {
  const { currentBook, error } = bookStore;

  return (
    <div>
      {error ? renderError(error)
        : renderBook(currentBook) }
    </div>
  );
}

export default inject(
  'viewState',
  'bookStore',
  'voteSessionStore'
)(observer(SearchDialog));
