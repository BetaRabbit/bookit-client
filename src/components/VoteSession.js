import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavUp from 'material-ui/svg-icons/navigation/arrow-upward';
import Snackbar from 'material-ui/Snackbar';

import SearchDialog from './SearchDialog';
import BookList from './BookList';

class VoteSession extends Component {
  css = {
    urlField: {
      width: '40%',
    },
    addBtn: {
      marginLeft: '15px',
      marginTop: '30px',
      verticalAlign: 'top',
    },
    navUpBtn: {
      position: 'fixed',
      top: '80%',
      left: '85%',
      width: '100px',
      height: '100px',
      padding: '25px',
    },
    navUpIcon: {
      width: '50px',
      height: '50px',
    },
  };

  componentDidMount() {
    this.props.voteSessionStore.load();
    window.onscroll = this.props.viewState.handleScroll;
  }

  componentWillUnmount() {
    window.onscroll = null;
  }

  handleGetClick = e => {
    const { bookStore, viewState } = this.props;
    viewState.handleSearchDialogOpen();
    bookStore.searchBook(viewState.urlFieldValue.trim());
  };

  renderNoVoteSession() {
    return <h2 className="book-list-message">No active vote session...</h2>;
  }

  renderVoteSession(vs) {
    const { viewState } = this.props;

    return (
      <div>
        <div>
          <TextField
            hintText="book's URL on JD.com"
            errorText={viewState.urlFieldErrorText}
            floatingLabelText="Book URL"
            style={this.css.urlField}
            value={viewState.urlFieldValue}
            onChange={viewState.handleUrlFieldChange}
          />
          <RaisedButton
            primary
            label="Get"
            disabled={!viewState.urlFieldValid}
            style={this.css.addBtn}
            onClick={this.handleGetClick}
          />
        </div>
        <BookList books={vs.books} />
        <SearchDialog />
        <Snackbar
          open={viewState.snackbarOpen}
          message={viewState.snackbarMessage}
          autoHideDuration={4000}
          onRequestClose={viewState.handleSnackbarClose}
        />
        {viewState.scrollY > 0 ? <IconButton
          style={this.css.navUpBtn}
          iconStyle={this.css.navUpIcon}
          onClick={() => window.scrollTo(0, 0)}
        >
          <NavUp color="rgba(0, 0, 0, 0.2)" hoverColor="rgba(0, 0, 0, 0.5)"/>
        </IconButton> : null}
      </div>
    );
  }

  render() {
    const { currentVoteSession } = this.props.voteSessionStore;

    return (
      currentVoteSession ?
        this.renderVoteSession(currentVoteSession) : this.renderNoVoteSession()
    );
  }
}

export default inject(
  'viewState',
  'bookStore',
  'voteSessionStore'
)(observer(VoteSession));
