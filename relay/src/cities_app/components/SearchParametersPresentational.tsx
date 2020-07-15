import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as SPC from "../mutations/SearchParametersController";
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

export function SearchParametersPresentational(props: RenderCallbackArgsType) {
  console.log({ props });
  let isLoading = React.useContext(LoadingContext);
  let { searchParams, url, searchMetadata, showApplyButton } = props;
  let ParameterSection = isLoading ? ParameterSectionSkeleton : ParameterSectionSuccess;
  return (
    <SearchParametersBlock>
      <ParameterSection>
        <div className="label placeholder">Country</div>
        <div className="input placeholder">
          <TextInput
            value={searchParams.countryNameContains}
            onChange={(value) => {
              SPC.handleEvent({ type: "edit", payload: { countryNameContains: value } });
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
            onChange={(range) =>
              SPC.handleEvent({
                type: "edit",
                payload: { populationGte: range.lower, populationLte: range.upper },
              })
            }
          />
        </div>
      </ParameterSection>
      {showApplyButton && (
        <div className="submit-button-box">
          <SubmitButton>
            <Link to={url}>apply</Link>
          </SubmitButton>
        </div>
      )}
    </SearchParametersBlock>
  );
}
