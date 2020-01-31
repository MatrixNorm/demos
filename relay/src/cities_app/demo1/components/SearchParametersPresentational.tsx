import * as React from "react";
import styled from "styled-components";
import { SubmitButton } from "../elements/Buttons";
import { TextInput, NumberInput } from "../elements/Inputs";

// const Input = styled.input`
//   width: calc(100% - 4px);
//   padding: 0;
// `;

const ParameterSection = styled.section`
  margin-bottom: 20px;
`;

export function SearchParametersPresentational({
  fieldValues,
  onFieldChange,
  onButtonClick
}) {
  return (
    <div>
      <ParameterSection>
        <div>Country:</div>
        <TextInput
          value={fieldValues.countryNameContains || ""}
          onChange={e => onFieldChange("countryNameContains", e.target.value)}
        />
      </ParameterSection>
      <ParameterSection>
        <div>Population more than:</div>
        <NumberInput
          step="100000"
          value={fieldValues.populationGte || ""}
          onChange={e =>
            onFieldChange("populationGte", parseInt(e.target.value) || null)
          }
        />
      </ParameterSection>
      <ParameterSection>
        <div>Population less than:</div>
        <NumberInput
          step="100000"
          value={fieldValues.populationLte || ""}
          onChange={e =>
            onFieldChange("populationLte", parseInt(e.target.value) || null)
          }
        />
      </ParameterSection>
      <div>
        <SubmitButton onClick={onButtonClick}>Apply</SubmitButton>
      </div>
    </div>
  );
}
