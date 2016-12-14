import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import { Container, Header } from 'semantic-ui-react';

import { getSearchResults } from '../actions/PostActions';
import ImageList from './ImageList';

class SearchResults extends Component {
  componentWillMount() {
    this.props.getSearchResults(this.props.params.searchQuery);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.searchQuery !== this.props.params.searchQuery) {
      this.props.getSearchResults(nextProps.params.searchQuery);
    }
  }

  render() {
    const { pics } = this.props;
    let resultsHeader = `No results found for "${this.props.params.searchQuery}"`;
    if (pics) {
      resultsHeader = `${pics.length} results found for "${this.props.params.searchQuery}"`;
    }
    return (
      <Container>
        <Header as="h3">{resultsHeader}</Header>
        <ImageList images={pics} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  pics: state.results,
});

const mapDispatchToProps = dispatch => ({
  getSearchResults(query) {
    dispatch(getSearchResults(query));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
