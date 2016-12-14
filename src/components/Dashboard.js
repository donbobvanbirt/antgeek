import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Table, Image, Grid, Divider } from 'semantic-ui-react';

import { getImagesByUser, upload } from '../actions/PostActions';
import ImageList from './ImageList';
import FileUpload from './FileUpload';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getImagesByUser(this.props.user.uid);
  }

  render() {
    const { user, userImages, upload } = this.props;
    const { displayName, email, photoURL } = user;
    console.log('user:', user);
    console.log('userImages:', userImages);
    return (
      <Container>
        <Header as="h1" textAlign="center">Dashboard</Header>
        <Divider />
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column floated="right">
              <Image src={photoURL} shape="rounded" size="small" />
            </Grid.Column>
            <Grid.Column>
              <Table basic="very" celled collapsing>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell singleLine>Display Name:</Table.Cell>
                    <Table.Cell singleLine>{displayName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell singleLine>Email:</Table.Cell>
                    <Table.Cell singleLine>{email}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Header as="h2">Your Posts:</Header>
        {/* <FileUpload submitFile={upload} /> */}
        <br />
        <ImageList images={userImages} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userImages: state.userImages,
});

const mapDispatchToProps = dispatch => ({
  getImagesByUser(id) {
    dispatch(getImagesByUser(id));
  },
  upload(file, details) {
    dispatch(upload(file, details));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
