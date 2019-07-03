import React from 'react';
import styled from 'styled-components';
import { SliderItem } from './SliderItem';

const StyledSlider = styled.div`
  width: 1160px;
  margin-bottom: 16px;
  overflow: hidden;
  cursor: move;

  ${
    props => props.ranges.reduce((acc, range) => (
      acc + `
        @media (max-width: ${range[1] + 1}px) {
          width: ${range[0] < props.ranges[props.ranges.length - 1][1]
            ? '90vw'
            : `${range[0]}px`
          };
        }
      `
      ), '')
  }
`;
const StyledDiv = styled.div`
  position: relative;
  display: flex;
  will-change: transform;
`;

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.slider = null;
    this.sliderWidth = null;
    this.sliderLeft = 0;
    this.shiftX = 0;
    this.startCoordinate = null;
    this.itemWidth = 280;
    this.itemMargin = 5;
    this.fullItemWidth = this.itemWidth + 2 * this.itemMargin;
  }

  componentDidUpdate() {
    const left = this.props.swipe.pageMultiplier * this.sliderWidth;
    const { data, title, nextPageToken } = this.props.search;

    // react has no refs yet in the componentDidMount phase so handling it here
    if (this.slider && !this.sliderWidth) this.sliderWidth = this.slider.clientWidth;

    if (this.sliderLeft !== left) {
      this.sliderLeft = left;
      this.animateSwipe(left);

      if (Math.abs(left) + 2 * this.sliderWidth > data.length * this.fullItemWidth) {
        this.props.searchAdditionally(title, nextPageToken);
      }
    }
  }

  animateSwipe = left => {
    this.slider.style.transition = 'transform 0.2s ease-in';
    this.slider.style.transform = `translate3d(${left}px, 0, 0)`;
  }

  swipeSlider = clientX => {
    const { data, title, nextPageToken } = this.props.search;
    let left;
    let pageMultiplier;

    this.slider.removeEventListener('mouseleave', this.handleMouseLeave, false);
    this.slider.removeEventListener('mousemove', this.handleMouseMove, false);
    this.slider.removeEventListener('touchmove', this.handleTouchMove, false);

    this.sliderLeft += this.shiftX;
    this.shiftX = 0;

    if (clientX > this.startCoordinate) {
      pageMultiplier = this.sliderLeft > 0
        ? 0
        : Math.floor(this.sliderLeft / this.sliderWidth) + 1;
    }
    else {
      pageMultiplier = Math.floor(this.sliderLeft / this.sliderWidth);
    }

    this.startCoordinate = null;
    left = this.sliderWidth * pageMultiplier;
    this.sliderLeft = left;

    this.animateSwipe(left);
    this.props.swipePagination(pageMultiplier);

    if (Math.abs(left) + 2 * this.sliderWidth > data.length * this.fullItemWidth) {
      this.props.searchAdditionally(title, nextPageToken);
    }
  }

  handleMouseDown = e => {
    // prevent slider collapse after inspecting with right click
    if (e.button !== 0) return;

    this.slider.addEventListener('mousemove', this.handleMouseMove, false);
    this.slider.addEventListener('mouseleave', this.handleMouseLeave, false);
    this.startCoordinate = e.clientX;
    this.sliderWidth = this.slider.clientWidth;
  }

  handleMouseMove = e => {
    this.shiftX = e.clientX - this.startCoordinate;
    this.slider.style.transform = `translate3d(${this.sliderLeft + this.shiftX}px, 0, 0)`;
  }

  handleMouseLeave = e => {
    if (e.button !== 0) return;

    this.swipeSlider(e.clientX);
  }

  handleMouseUp = e => {
    if (this.startCoordinate) {
      this.swipeSlider(e.clientX);
    }
  }

  handleTouchStart = e => {
    this.slider.addEventListener('touchmove', this.handleTouchMove, false);
    this.startCoordinate = e.touches[0].clientX;
    this.sliderWidth = this.slider.clientWidth;
  }

  handleTouchMove = e => {
    this.shiftX = e.touches[0].clientX - this.startCoordinate;
    this.slider.style.transform = `translate3d(${this.sliderLeft + this.shiftX}px, 0, 0)`;
  }

  handleTouchEnd = e => {
    if (this.startCoordinate) {
      this.swipeSlider(e.changedTouches[0].clientX);
    }
  }

  handleTransitionEnd = e => {
    this.slider.style.transition = 'none';
  }

  render() {
    const { data } = this.props.search;
    const { sliderLeft } = this.props.swipe;
    const styles = { transform: `translate3d(${sliderLeft}px, 0, 0)` }

    return data.length
    ? (
      <StyledSlider ranges={this.props.ranges}>
        <StyledDiv
          ref={div => { this.slider = div; }}
          style={styles}
          onTransitionEnd={this.handleTransitionEnd}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {data.map((elem, ind) => {
            return (
              <SliderItem
                key={ind + 1}
                data={elem}
                width={this.itemWidth}
                margin={this.itemMargin}
              />
            )
          })}
        </StyledDiv>
      </StyledSlider>
    )
    : null;
  }
}
