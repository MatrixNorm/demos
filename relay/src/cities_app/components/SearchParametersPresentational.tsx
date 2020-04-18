import * as React from "react";
import styled from "styled-components";
import {
  DispatchFunctionType,
  SearchParametersType,
  RenderCallbackArgsType,
} from "./SearchParameters";
import { SubmitButton } from "../elements/Buttons";
import RangeSlider from "../elements/RangeSlider";
import { TextInput } from "../elements/Inputs";
import { SearchParameters_searchMetadata } from "__relay__/SearchParameters_searchMetadata.graphql";

const SearchParametersBlock = styled.div`
  input {
    width: calc(100% - 4px);
  }
`;

const ParameterSection = styled.section`
  margin-bottom: 20px;
`;

export function SearchParametersPresentational({
  dispatch,
  searchParams,
  searchMetadata,
  showApplyButton,
}: RenderCallbackArgsType) {
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
          step={1}
          onChange={(range: any) => {
            dispatch(["fieldChange", ["populationGte", range.lower]]);
            dispatch(["fieldChange", ["populationLte", range.upper]]);
          }}
        />
      </ParameterSection>
      {showApplyButton && (
        <div>
          <SubmitButton onClick={() => dispatch(["applyChange"])}>
            Apply
          </SubmitButton>
        </div>
      )}
    </SearchParametersBlock>
  );
}
