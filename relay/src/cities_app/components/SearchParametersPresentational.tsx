import * as React from "react";
import styled, { css } from "styled-components";
import LoadingContext from "../LoadingContext";
import { SubmitButton } from "../elements/Buttons";
import RangeSlider from "../elements/RangeSlider";
import { TextInput } from "../elements/Inputs";

import { RenderCallbackArgsType } from "./SearchParameters";

const SearchParametersBlock = styled.div`
  .submit-button-box {
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }
`;

const ParameterSectionSuccess = styled.section`
  margin-bottom: 20px;

  input {
    width: calc(100% - 4px);
  }

  matrixnorm-range-slider {
    position: relative;
    left: -2px;
  }

  .label {
    display: inline-block;
    font-size: 0.9em;
    margin-bottom: 0.5em;
    position: relative;
  }

  .input {
    position: relative;
  }
`;

const sharedStyle = css`
  content: "";
  background: silver;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ParameterSectionSkeleton = styled(ParameterSectionSuccess)`
  .label::after {
    ${sharedStyle}
  }

  .input::after {
    ${sharedStyle}
  }

  matrixnorm-range-slider {
    visibility: hidden;
  }
`;

export function SearchParametersPresentational(props: RenderCallbackArgsType) {
  let isLoading = React.useContext(LoadingContext);
  let { dispatch, searchParams, searchMetadata, showApplyButton } = props;

  let ParameterSection = isLoading
    ? ParameterSectionSkeleton
    : ParameterSectionSuccess;

  if (isLoading) {
    dispatch = () => {};
  }

  return (
    <SearchParametersBlock>
      <ParameterSection>
        <div className="label">Country</div>
        <div className="input">
          <TextInput
            value={searchParams.countryNameContains}
            onChange={(e) =>
              dispatch(["fieldChange", ["countryNameContains", e.target.value]])
            }
          />
        </div>
      </ParameterSection>
      <ParameterSection>
        <div className="label">Population</div>
        <div className="input">
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
        </div>
      </ParameterSection>
      {showApplyButton && (
        <div className="submit-button-box">
          <SubmitButton onClick={() => dispatch && dispatch(["applyChange"])}>
            Apply
          </SubmitButton>
        </div>
      )}
    </SearchParametersBlock>
  );
}

export function SearchParametersPresentationalLoading() {
  return <div>loading!!</div>;
}
