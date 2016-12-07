import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';
import { Container, Divider } from 'semantic-ui-react';

import { getSearchResults } from '../actions/PostActions';
import ImageList from './ImageList';

class SearchResults extends Component {
  componentWillMount() {
    this.props.getSearchResults(this.props.params.searchQuery);
  }

  render() {
    return (
      <Container>
        <ImageList images={this.props.pics} />
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
