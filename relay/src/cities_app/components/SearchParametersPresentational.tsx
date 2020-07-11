import * as React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import LoadingContext, { placeholderCssMixin } from "../verysmart/LoadingContext";
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

const ParameterSectionSkeleton = styled(ParameterSectionSuccess)`
  ${placeholderCssMixin}

  matrixnorm-range-slider {
    visibility: hidden;
  }
`;

function queryURL(searchParams: RenderCallbackArgsType["localSearchParams"]) {
  let obj = new URLSearchParams("");
  for (let k in searchParams) {
    // @ts-ignore
    searchParams[k] && obj.append(k, searchParams[k]);
  }
  return obj.toString();
}

export function SearchParametersPresentational(props: RenderCallbackArgsType) {
  let { url } = useRouteMatch();
  let isLoading = React.useContext(LoadingContext);
  let {
    dispatch,
    searchParams,
    localSearchParams,
    searchMetadata,
    showApplyButton,
  } = props;
  console.log(queryURL(localSearchParams));
  let ParameterSection = isLoading ? ParameterSectionSkeleton : ParameterSectionSuccess;

  if (isLoading) {
    dispatch = () => {};
  }

  return (
    <SearchParametersBlock>
      <ParameterSection>
        <div className="label placeholder">Country</div>
        <div className="input placeholder">
          <TextInput
            value={searchParams.countryNameContains}
            onChange={(value) => {
              dispatch(["fieldChange", ["countryNameContains", value]]);
            }}
          />
        </div>
      </ParameterSection>
      <ParameterSection>
        <div className="label placeholder">Population</div>
        <div className="input placeholder">
          <RangeSlider
            min={searchMetadata.populationLowerBound}
            max={searchMetadata.populationUpperBound}
            x1={searchParams.populationGte}
            x2={searchParams.populationLte}
            step={1}
            onChange={(range: any) => {
              console.log(range);
              dispatch(["fieldChange", ["populationGte", range.lower]]);
              dispatch(["fieldChange", ["populationLte", range.upper]]);
            }}
          />
        </div>
      </ParameterSection>
      <Link to={`${url}?${queryURL(localSearchParams)}`}>apply</Link>
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
