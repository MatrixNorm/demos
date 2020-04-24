import * as React from "react";
import styled from "styled-components";
import { RenderCallbackArgsType } from "./SearchParameters";
import { SubmitButton } from "../elements/Buttons";
import RangeSlider from "../elements/RangeSlider";
import { TextInput } from "../elements/Inputs";

const SearchParametersBlock = styled.div``;

const ParameterSection = styled.section`
  margin-bottom: 20px;

  input {
    width: calc(100% - 4px);
  }

  matrixnorm-range-slider {
    position: relative;
    left: -2px;
  }
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
          x1={searchParams.populationGte}
          x2={searchParams.populationLte}
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
