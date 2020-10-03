import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoadingContext, placeholderCssMixin } from "../verysmart/LoadingContext";
import { SubmitButton } from "../elements/Buttons";
import RangeSlider from "../elements/RangeSlider";
import { TextInput } from "../elements/Inputs";
import { NukeFragRef, NukeNulls } from "../helpers/typeUtils";
import { SearchParameters_metadata } from "__relay__/SearchParameters_metadata.graphql";
import { SearchParameters_searchParams } from "__relay__/SearchParameters_searchParams.graphql";

type SearchParameters = NukeNulls<NukeFragRef<SearchParameters_searchParams>>;
export type Fields = {
  [P in keyof SearchParameters]: Pick<SearchParameters[P], "value" | "error">;
};
export type EditPayload = Partial<
  {
    [P in keyof Fields]: Fields[P]["value"];
  }
>;
export type Metadata = NukeFragRef<SearchParameters_metadata>;

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
  onEdit: (delta: EditPayload) => void;
  fields: Fields;
  metadata: Metadata;
  url: string | null;
};

export function SearchParametersPresentational(props: Props) {
  let isLoading = React.useContext(LoadingContext);
  let ParameterSection = isLoading ? ParameterSectionSkeleton : ParameterSectionSuccess;
  let { fields, url, metadata, onEdit } = props;
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
      {url && (
        <div className="submit-button-box">
          <SubmitButton>
            <Link to={url}>apply</Link>
          </SubmitButton>
        </div>
      )}
    </SearchParametersBlock>
  );
}
