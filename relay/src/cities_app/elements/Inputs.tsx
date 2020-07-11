import * as React from "react";
import styled from "styled-components";

const noop = () => {};

const TextInput_ = (props: { value: string; onChange?: (value: string) => void }) => {
  const { onChange = noop } = props;
  const newProps = {
    ...props,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
  };
  return <input type="text" {...newProps} />;
};

export const TextInput = styled(TextInput_)`
  padding: 0;
  margin: 0;
`;

const NumberInput_ = (props: { step: string; onChange?: (value: number) => void }) => {
  const { onChange = noop } = props;
  const newProps = {
    ...props,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(Number(e.target.value)),
  };
  return <input type="number" {...newProps} />;
};

export const NumberInput = styled(NumberInput_)`
  padding: 0;
  margin: 0;
`;
