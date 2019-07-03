import React from 'react';
import styled from 'styled-components';
import { FaUser, FaCalendarAlt, FaEye  } from 'react-icons/fa';

const StyledTable = styled.table`
  width: 100%;
  margin: 12px 0px;
  padding: 0 12px;
  font-size: 1.8em;
`;

const StyledTh = styled.th`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: flex-start;
  width: 50px;
`

export const SliderTable = props => {
  const { snippet, statistics } = props;

  return (
    <StyledTable>
      <tbody>
        <tr>
          <StyledTh>
            <FaUser />
          </StyledTh>
          <td>
            {snippet.channelTitle}
          </td>
        </tr>
        <tr>
          <StyledTh>
            <FaCalendarAlt />
          </StyledTh>
          <td>
            {new Date(Date.parse(snippet.publishedAt)).toLocaleDateString()}
          </td>
        </tr>
        <tr>
          <StyledTh>
            <FaEye />
          </StyledTh>
          <td>
            {statistics.viewCount}
          </td>
        </tr>
      </tbody>
    </StyledTable>
  )
}
