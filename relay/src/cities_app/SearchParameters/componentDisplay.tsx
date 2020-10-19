import * as React from "react";
import styled from "styled-components";
import { LoadingContext, placeholderCssMixin } from "../verysmart/LoadingContext";
import { SubmitButton } from "../elements/Buttons";
import RangeSlider from "../elements/RangeSlider";
import { TextInput } from "../elements/Inputs";
import * as t from "./types";

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

export type Props = {
  fields: t.SPDisplayed;
  metadata: t.Metadata;
  onEdit: (delta: t.SPEditPayload) => void;
  onSubmit: () => void | null;
};

export function SearchParametersDisplayComponent({
  fields,
  metadata,
  onEdit,
  onSubmit,
}: Props) {
  let isLoading = React.useContext(LoadingContext);
  let ParameterSection = isLoading ? ParameterSectionSkeleton : ParameterSectionSuccess;
  return (
    <SearchParametersBlock>
      <ParameterSection>
        <div className="label placeholder">Country</div>
        <div className="input placeholder">
          <TextInput
            value={fields.countryNameContains.value}
            onChange={(value) => onEdit({ countryNameContains: value })}
          />
        </div>
      </ParameterSection>
      <ParameterSection>
        <div className="label placeholder">Population</div>
        <div className="input placeholder">
          <RangeSlider
            min={metadata.populationLowerBound}
            max={metadata.populationUpperBound}
            x1={fields.populationGte.value}
            x2={fields.populationLte.value}
            step={1}
            onChange={(range) =>
              onEdit({ populationGte: range.lower, populationLte: range.upper })
            }
          />
        </div>
      </ParameterSection>
      {onSubmit && (
        <div className="submit-button-box">
          <SubmitButton onClick={onSubmit}></SubmitButton>
        </div>
      )}
    </SearchParametersBlock>
  );
}
