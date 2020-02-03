import * as React from "react";
import styled from "styled-components";
import { DispatchT } from "./SearchParameters";
import { SearchParamsT } from "../types";
import { SubmitButton } from "../elements/Buttons";
import { TextInput, NumberInput } from "../elements/Inputs";

const SearchParametersBlock = styled.div`
  input {
    width: calc(100% - 4px);
  }
`;

const ParameterSection = styled.section`
  margin-bottom: 20px;
`;

interface Props {
  dispatch: DispatchT;
  searchParams: SearchParamsT;
}

export function SearchParametersPresentational({
  dispatch,
  searchParams
}: Props) {
  return (
    <SearchParametersBlock>
      <ParameterSection>
        <div>Country:</div>
        <TextInput
          value={searchParams.countryNameContains || ""}
          onChange={e =>
            dispatch(["fieldChange", ["countryNameContains", e.target.value]])
          }
        />
      </ParameterSection>
      <ParameterSection>
        <div>Population more than:</div>
        <NumberInput
          step="100000"
          value={searchParams.populationGte || ""}
          onChange={e =>
            dispatch([
              "fieldChange",
              ["populationGte", parseInt(e.target.value) || null]
            ])
          }
        />
      </ParameterSection>
      <ParameterSection>
        <div>Population less than:</div>
        <NumberInput
          step="100000"
          value={searchParams.populationLte || ""}
          onChange={e =>
            dispatch([
              "fieldChange",
              ["populationLte", parseInt(e.target.value) || null]
            ])
          }
        />
      </ParameterSection>
      <div>
        <SubmitButton onClick={() => dispatch(["applyChange"])}>
          Apply
        </SubmitButton>
      </div>
    </SearchParametersBlock>
  );
}
