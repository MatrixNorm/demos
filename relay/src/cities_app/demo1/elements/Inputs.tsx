import styled from "styled-components";

export const TextInput = styled.input.attrs(props => ({ type: "text" }))`
  padding: 0;
  margin: 0;
`;

export const NumberInput = styled.input.attrs(props => ({ type: "number" }))`
  padding: 0;
  margin: 0;
`;
