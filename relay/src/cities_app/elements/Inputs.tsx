import * as React from "react";
import styled from "styled-components";

const TextInput_ = (props: any) => {
  const { onChange } = props;
  props = {
    ...props,
    onChange: (e: any) => onChange(e.target.value),
  };
  return <input type="text" {...props} />;
};

export const TextInput = styled(TextInput_)`
  padding: 0;
  margin: 0;
`;

const NumberInput_ = (props: any) => {
  const { onChange } = props;
  props = {
    ...props,
    onChange: (e: any) => onChange(Number(e.target.value)),
  };
  return <input type="number" {...props} />;
};

export const NumberInput = styled(NumberInput_)`
  padding: 0;
  margin: 0;
`;
