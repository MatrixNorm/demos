import * as React from "react";
import styled from "styled-components";
import { DispatchFunctionType } from "./SearchParameters";
import { SubmitButton } from "../elements/Buttons";
import RangeSlider from "../elements/RangeSlider";
import { TextInput } from "../elements/Inputs";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";

const SearchParametersBlock = styled.div`
  input {
    width: calc(100% - 4px);
  }
`;

const ParameterSection = styled.section`
  margin-bottom: 20px;
`;

interface Props {
  dispatch: DispatchFunctionType;
  searchParams: SearchParameters_searchParams;
  searchMetadata: SearchParameters_metadata;
}

export function SearchParametersPresentational({
  dispatch,
  searchParams,
  searchMetadata,
}: Props) {
  return (
    <SearchParametersBlock>
      <ParameterSection>
        <div>Country:</div>
        <TextInput
          value={searchParams.countryNameContains || ""}
          onChange={(e) =>
            dispatch(["fieldChange", ["countryNameContains", e.target.value]])
          }
        />
      </ParameterSection>
      <ParameterSection>
        <div>Population</div>
        <RangeSlider
          min={searchMetadata.populationLowerBound}
          max={searchMetadata.populationUpperBound}
          x1={searchParams.populationGte || searchMetadata.populationUpperBound}
          x2={searchParams.populationLte || searchMetadata.populationUpperBound}
          step={1000}
          onChange={(range: any) => {
            dispatch(["fieldChange", ["populationGte", range.lower]]);
            dispatch(["fieldChange", ["populationLte", range.upper]]);
          }}
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
