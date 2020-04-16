import * as React from "react";
import styled from "styled-components";
import { DispatchT } from "./SearchParameters";
import { SubmitButton } from "../elements/Buttons";
import RangeSlider from "../elements/RangeSlider";
import { TextInput, NumberInput } from "../elements/Inputs";
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
  dispatch: DispatchT;
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
          onChange={(range) =>
            dispatch([
              "fieldChange",
              ["populationGte", parseInt(e.target.value) || null],
            ])
          }
        />
        {/*<NumberInput
          step="100000"
          value={searchParams.populationGte || ""}
          onChange={(e) =>
            dispatch([
              "fieldChange",
              ["populationGte", parseInt(e.target.value) || null],
            ])
          }
        />*/}
      </ParameterSection>
      <div>
        <SubmitButton onClick={() => dispatch(["applyChange"])}>
          Apply
        </SubmitButton>
      </div>
    </SearchParametersBlock>
  );
}
