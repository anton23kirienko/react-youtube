import React from 'react';
import styled from 'styled-components';
import { SliderTable } from './SliderTable';

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${props => `${props.width}px`};
  height: 390px;
  border-radius: 12px;
  margin: ${props => `${props.margin}px`};
  padding: 12px 0px;
  background-color: var(--color-white);

  @media(max-width: 280px) {
    min-width: 90vw;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40%;
  background-image: ${props => `url(${props.imageUrl})`}
`;

const StyledAnchor = styled.a`
  width: 100%;
  padding: 18px 8px;
  max-height: 100px;
  font-size: 1.6em;
  color: var(--color-white);
  text-align: center;
  background-color: var(--color-green);
`;

const StyledDescription = styled.p`
  width: 100%;
  max-height: 30%;
  padding: 0px 12px;
  text-align: justify;
  overflow: hidden;
`;

export const SliderItem = props => {
  const { id, snippet, statistics } = props.data;

  return (
    <StyledArticle width={props.width} margin={props.margin}>
      <StyledDiv imageUrl={snippet.thumbnails.medium.url}>
        <StyledAnchor
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
        >
          {snippet.title}
        </StyledAnchor>
      </StyledDiv>
      <SliderTable {...{ snippet, statistics }}/>
      <StyledDescription>
        {snippet.localized.description}
      </StyledDescription>
    </StyledArticle>
  );
}
