import React from 'react';
import { observer, inject } from 'mobx-react';

import IconButton from 'material-ui/IconButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import { pink500 } from 'material-ui/styles/colors'

function Book(props) {
  const { book } = props;

  return <div className="book-item-container">
    <img src={book.image} alt={book.title} width="150px" height="150px" />
    <div className="info" >
      <h4><a href={book.purchase_url} target="_blank">{book.title}</a></h4>
      <div className="author">{book.author}</div>
      <div className="publisher">{book.publisher}</div>
      <div className="price">¥{parseFloat(book.price).toFixed(2)}</div>
    </div>
    {!props.hideAction ? renderAction(props) : null}
  </div>;
}

function handleVoteClick(props) {
  return e => {
    const { book, voteSessionStore } = props;
    voteSessionStore.voteBook(voteSessionStore.currentVoteSession.id, book.id);
  }
}

function renderAction(props) {
  const { book, viewState, voteSessionStore } = props;
  const voted = viewState.localVotes.find(vote =>
    vote.book_id === book.id && vote.vote_session_id === voteSessionStore.currentVoteSession.id );
  let voteBtn = <IconButton
    tooltip="Like"
    tooltipPosition="top-center"
    onClick={handleVoteClick(props)}
  >
    <ActionFavoriteBorder color={pink500} />
  </IconButton>;

  if (voted) {
    voteBtn = <IconButton>
        <ActionFavorite color={pink500} />
      </IconButton>
  }

  return (
    <div className="action">
      {voteBtn}
      {book.votes.length ? <span>+{book.votes.length}</span> : null}
    </div>
  );
}

export default inject(
  'viewState',
  'voteSessionStore'
)(observer(Book));
