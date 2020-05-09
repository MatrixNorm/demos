import * as React from "react";
import styled from "styled-components";

const TextInput_ = (props: any) => {
  props = { ...props, onChange: (e: any) => e.target.value };
  return <input type="number" {...props} />;
};
export const TextInput = styled(TextInput_)`
  padding: 0;
  margin: 0;
`;

const NumberInput_ = (props: any) => {
  props = { ...props, onChange: (e: any) => Number(e.target.value) };
  return <input type="number" {...props} />;
};
export const NumberInput = styled(NumberInput_)`
  padding: 0;
  margin: 0;
`;
