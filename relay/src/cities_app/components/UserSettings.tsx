import * as React from "react";
import { graphql, createFragmentContainer, RelayProp } from "react-relay";
import styled from "styled-components";
import * as UserSettingsUpdateController from "../mutations/UserSettingsUpdateController2";
import { isTrueDelta, stripEmptyProps } from "../helpers/object";
import LoadingContext, { placeholderCssMixin } from "../LoadingContext";
import { NumberInput, TextInput } from "../elements/Inputs";
import { SubmitButton } from "../elements/Buttons";
import { NukeFragRef } from "../helpers/typeUtils";
import { UserSettings_settings } from "__relay__/UserSettings_settings.graphql";
import { UserSettings_editDelta } from "__relay__/UserSettings_editDelta.graphql";
import { UserSettings_optimisticDelta } from "__relay__/UserSettings_optimisticDelta.graphql";

let x: Partial<UserSettings_settings> = {
  citiesPaginationPageSize: 22,
};

export const Section = styled.section`
  display: flex;
  min-height: 1.5em;
  padding: 0.5em 0 0.5em 0;
  .editing {
    background: red;
  }
  .setting-name {
    flex: auto;
  }
`;

export const UserSettingsSuccess = styled.div`
  .placeholder {
    position: relative;
  }
  display: flex;
  flex-direction: column;
  .button-box {
    text-align: center;
  }
`;
export const UserSettingsLoading = styled(UserSettingsSuccess)`
  ${placeholderCssMixin}
`;

function SectionComponent({
  value,
  isEdited,
  name,
  label,
  onChange,
  children,
}: {
  value: any;
  isEdited: boolean;
  name: string;
  label: string;
  onChange: any;
  children: any;
}) {
  return (
    <Section test-id={`${name}-section`} className={isEdited ? "editing" : ""}>
      <div className="setting-name">
        <span className="setting-name-label placeholder">{label}</span>
      </div>
      <div className="placeholder">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            value,
            onChange,
            "test-id": `${name}-input`,
          });
        })}
      </div>
    </Section>
  );
}

type Props = {
  settings: UserSettings_settings;
  editDelta: UserSettings_editDelta | null;
  optimisticDelta: UserSettings_optimisticDelta | null;
  relay: RelayProp;
};

export default createFragmentContainer(
  ({ settings, editDelta, optimisticDelta, relay }: Props) => {
    const isLoading = React.useContext(LoadingContext);
    const UserSettings = isLoading ? UserSettingsLoading : UserSettingsSuccess;
    const optValue = { ...settings, ...stripEmptyProps(optimisticDelta) };

    function xxx(name: keyof NukeFragRef<UserSettings_settings>) {
      let value = (editDelta || {})[name] || optValue[name];
      return {
        value,
        isEdited: value != optValue[name],
        name,
        onChange: (val: any) => {
          //console.log(val)
          UserSettingsUpdateController.handleEvent(
            { type: "edit", payload: { [name]: val } },
            relay.environment
          );
        },
      };
    }

    function onSubmit() {
      UserSettingsUpdateController.handleEvent({ type: "submit" }, relay.environment);
    }

    function onClear() {
      UserSettingsUpdateController.handleEvent({ type: "clear" }, relay.environment);
    }

    return (
      <UserSettings>
        <SectionComponent
          {...xxx("citiesPaginationPageSize")}
          label="Pagination Page Size"
        >
          <NumberInput step="1" />
        </SectionComponent>
        <SectionComponent {...xxx("foo")} label="Foo parameter">
          <TextInput />
        </SectionComponent>
        <SectionComponent {...xxx("bar")} label="Bar parameter">
          <NumberInput step="1" />
        </SectionComponent>
        <div className="button-box">
          <span className="placeholder">
            <SubmitButton
              onClick={onSubmit}
              test-id="submit-button"
              className={isTrueDelta(editDelta, optValue) ? "" : "disabled"}
            >
              Sync
            </SubmitButton>
          </span>
        </div>
      </UserSettings>
    );
  },
  {
    settings: graphql`
      fragment UserSettings_settings on UserSettings {
        citiesPaginationPageSize
        foo
        bar
      }
    `,
    editDelta: graphql`
      fragment UserSettings_editDelta on UIUserSettingsDelta {
        citiesPaginationPageSize
        foo
        bar
      }
    `,
    optimisticDelta: graphql`
      fragment UserSettings_optimisticDelta on UIUserSettingsDelta {
        citiesPaginationPageSize
        foo
        bar
      }
    `,
  }
);

export const defaultData = {
  settings: {
    citiesPaginationPageSize: 5,
    foo: "a",
    bar: 1,
  } as NukeFragRef<UserSettings_settings>,
  editDelta: null,
  optimisticDelta: null,
};
