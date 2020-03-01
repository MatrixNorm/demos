import styled from "styled-components";

const BasePaginationButton = styled.button`
  background: transparent;
  display: inline-block;
  width: 2em;
  height: 2em;
  border: 0px;
  padding: 0;

  &:after {
    content: "";
    display: inline-block;
    margin-top: 0.3em;
    margin-left: -0.2em;
    width: 0.7em;
    height: 0.7em;
    border-top: 0.3em solid #333;
    border-right: 0.3em solid #333;
  }
`;

export const NextButton = styled(BasePaginationButton)`
  &:after {
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const PrevButton = styled(BasePaginationButton)`
  &:after {
    -moz-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
`;

export const SubmitButton = styled.button``;

