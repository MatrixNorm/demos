import * as React from "react";
import { useContext } from "react";
import styled from "styled-components";
import {
  SearchParametersContext,
  EventDispatchContext,
  SearchParams
} from "./SearchParameters";
import { SubmitButton } from "../elements/Buttons";
import { TextInput, NumberInput } from "../elements/Inputs";

// const Input = styled.input`
//   width: calc(100% - 4px);
//   padding: 0;
// `;

const ParameterSection = styled.section`
  margin-bottom: 20px;
`;

function Field({
  fieldName,
  children
}: {
  fieldName: keyof SearchParams;
  children: any;
}) {
  const fieldValues = useContext(SearchParametersContext);
  const dispatch = useContext(EventDispatchContext);
  return React.Children.map(children, child => {
    if (child.type === TextInput) {
      return React.cloneElement(child, {
        value: fieldValues[fieldName] || "",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(["fieldChange", [fieldName, e.target.value]]);
        }
      });
    }
    if (child.type === NumberInput) {
      return React.cloneElement(child, {
        value: fieldValues[fieldName] || "",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch([
            "fieldChange",
            [fieldName, parseInt(e.target.value) || null]
          ]);
        }
      });
    }
    return child;
  });
}

export function SearchParametersPresentational() {
  const dispatch = useContext(EventDispatchContext);
  return (
    <div>
      <ParameterSection>
        <div>Country:</div>
        <Field fieldName="countryNameContains">
          <TextInput />
        </Field>
      </ParameterSection>
      <ParameterSection>
        <div>Population more than:</div>
        <Field fieldName="populationGte">
          <NumberInput step="100000" />
        </Field>
      </ParameterSection>
      <ParameterSection>
        <div>Population less than:</div>
        <Field fieldName="populationLte">
          <NumberInput step="100000" />
        </Field>
      </ParameterSection>
      <div>
        <SubmitButton onClick={() => dispatch(["applyChange"])}>
          Apply
        </SubmitButton>
      </div>
    </div>
  );
}
