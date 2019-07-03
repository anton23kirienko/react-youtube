import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  min-height: 50px;
  margin-bottom: 16px;
  border: 3px solid var(--color-blue);
  border-radius: 5px;

  @media (min-width: 740px) {
    width: 720px;
  }

  @media (max-width: 740px) {
    width: 90%;
    overflow: hidden;
  }
`

const StyledInput = styled.input`
  width: 100%;
  padding: 4px 12px;
  border: none;
  font: 900 2em Arial;
  color: var(--color-black);
  background-color: var(--color-gray);
  appearance: none;

  &:focus,
  &:active {
    background-color: var(--color-blue);
  }
`;

const StyledButton = styled.button`
  position: relative;
  padding: 0 14px;
  border: none;
  font: 900 2em Arial;
  color: var(--color-black);
  background-color: inherit;
  cursor: pointer;

  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    width: 1px;
    height: 80%;
    border-left: 1px solid var(--color-black);
    transform: translateY(-50%);
    content: '';
  }

  &:focus,
  &:hover,
  &:active { background-color: var(--color-darkgray); }
`;

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.button = null;
    this.input = null;
    this.state = {
      inputValue: '',
      submittedValue: ''
    }
  }


  onChange = e => {
    this.setState({inputValue: e.target.value});
  }

  submitForm = e => {
    const { inputValue, submittedValue } = this.state;

    e.preventDefault();

    if (inputValue !== submittedValue) {
      this.props.searchInitially(inputValue);
      this.setState({ submittedValue: inputValue });
    }

    this.setState({ inputValue: '' });
    this.button.blur();
    this.input.blur();
  }

  render() {
    return (
      <StyledForm
        onSubmit={this.submitForm}
      >
        <StyledInput
          type="text"
          placeholder="Type here..."
          value={this.state.inputValue}
          onChange={this.onChange}
          ref={input => { this.input = input; }}
          required
        />
        <StyledButton ref={button => { this.button = button; }}>search</StyledButton>
      </StyledForm>
    );
  }
}
