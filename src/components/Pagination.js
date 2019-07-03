import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  box-sizing: content-box;
  width: ${props => `${props.width}px`};
  height: 60px;
  overflow: hidden;

  @media(max-width: 290px) {
    width: 90vw;
  }
`;

const StyledSlider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  transition: transform 0.26s ease-out;
  will-change: transform;
`

const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${props => `${props.itemWidth}px`};
  height: ${props => `${props.itemWidth}px`};
  margin: ${props => `${props.itemMargin}px`};
  border-radius: 50%;
  background-color: var(--color-white);
  cursor: pointer;
`

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.width = 280;
    this.itemWidth = 32;
    this.itemMargin = 4;
    this.fullItemWidth = this.itemWidth + this.itemMargin * 2;
    this.initialShift = this.width / 2 - this.itemWidth / 2 - this.itemMargin;
  }

  handleClick = e => {
    if (e.target.hasAttribute('data-is-page-button')) {
      const pageMultiplier = parseInt(e.target.getAttribute('data-key'), 10);

      if (pageMultiplier === this.props.pageMultiplier) return;

      this.props.swipePagination(-pageMultiplier);
    }
  }

  render() {
    const { data, pageMultiplier } = this.props;
    const shift = this.initialShift + pageMultiplier * this.fullItemWidth;
    const styles = { transform: `translate3d(${shift}px, 0, 0)` }

    return data.length
    ? (
      <StyledDiv width={this.width}>
        <StyledSlider
          style={styles}
          onClick={this.handleClick}
          onTouchStart={this.handleTouchStart}
        >
          {data.map((el, ind) => {
            return (
              <StyledSpan
                key={ind}
                itemWidth={this.itemWidth}
                itemMargin={this.itemMargin}
                data-key={ind}
                data-is-page-button
              >
                {ind + 1}
              </StyledSpan>
            )
          })}
        </StyledSlider>
      </StyledDiv>
    )
    : null;
  }
}
