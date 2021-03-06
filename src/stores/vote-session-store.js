import { extendObservable, action } from 'mobx';

import viewState from './view-state';
import { fetchVoteSessions } from '../api/vote-session-api';
import { fetchBook } from '../api/book-api';
import { vote } from '../api/vote-api';

class VoteSessionStore {
  constructor() {
    extendObservable(this, {
      voteSessionList: [],
      currentVoteSession: null,
      error: null,

      currentVoteSessionTotalPrice: () => {
        let total = 0;

        if (this.currentVoteSession) {
          for (const book of this.currentVoteSession.books) {
            total += parseFloat(book.price);
          }
        }

        return total.toFixed(2);
      },
    });
  }

  load = action('load-voteSessionList', () => {
    fetchVoteSessions()
      .then(action('load-voteSessionList-success', voteSessionData => {
        this.voteSessionList = voteSessionData;

        if (voteSessionData.length) {
          this.currentVoteSession = voteSessionData[voteSessionData.length - 1];
        }

        this.error = null;
      }))
      .catch(action('load-voteSessionList-failure', error => {
        this.error = error;
        viewState.setSnackbarMessage(`Failed to get order list: ${error.message}`);
        viewState.handleSnackbarOpen();
      }));
  });

  voteBook = action('vote-book', (sessionId, bookId, userId = 1) => {
    vote({
      vote: {
        vote_session: sessionId,
        book: bookId,
        user: userId,
      }
  }).then(action('vote-book-success', voteData => {
      fetchBook({ id: voteData.book_id })
        .then(action('fetch-book-success', bookData => {
          const vs = this.voteSessionList.find(vs => vs.id === sessionId);
          const book = vs.books.find(b => b.id === bookData.id);
          let message = 'Book added to order list';

          if (book) {
            book.votes.push(voteData);
            message = 'Like this book';
          } else {
            vs.books.push(bookData);
          }

          this.error = null;
          viewState.setSnackbarMessage(message);
          viewState.handleSnackbarOpen();
          viewState.setLocalVotes([...viewState.localVotes, voteData]);
        }))
    })).catch(action('vote-book-failure', error => {
      this.error = error;
      viewState.setSnackbarMessage(`Failed to add your book: ${error.message}`);
      viewState.handleSnackbarOpen();
    }))
  });
}

export default new VoteSessionStore();
