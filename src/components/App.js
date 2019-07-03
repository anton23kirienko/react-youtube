import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Form from './Form';
import Slider from './Slider';
import Pagination from './Pagination';

import { searchInitially, searchAdditionally } from './../actions/search';
import { swipePagination } from './../actions/swipe';

import { GlobalStyle } from './../utils/GlobalStyle';


const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 12px;

  @media (min-height: 700px) {
    height: 700px;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.width = window.innerWidth;
    this.ranges = [
      [870, 1159],
      [580, 869],
      [290, 579],
      [0, 289],
    ];
  }

  render() {
    const {
      search,
      swipe,
      searchInitially,
      searchAdditionally,
      swipePagination
    } = this.props;

    return (
      <React.Fragment>
        <GlobalStyle />
        <StyledSection>
          <Form searchInitially={searchInitially} />
          <Slider
            ranges={this.ranges}
            search={search}
            swipe={swipe}
            searchAdditionally={searchAdditionally}
            swipePagination={swipePagination}
          />
          <Pagination
            data={search.data}
            pageMultiplier={swipe.pageMultiplier}
            swipePagination={swipePagination}
          />
        </StyledSection>
      </React.Fragment>
    );
  }
}

export default connect(
  state => state,
  {
    searchInitially,
    searchAdditionally,
    swipePagination
  }
)(App);
