import * as React from "react";
import styled from "styled-components";
import LoadingContext, { placeholderCssMixin } from "../LoadingContext";
import { NumberInput, TextInput } from "../elements/Inputs";
import { SubmitButton } from "../elements/Buttons";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";

export type UserSettingsType = UserSettings_user["settings"];

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
  field,
  label,
  children,
}: {
  field: {
    name: keyof UserSettingsType;
    isEdited: Boolean;
    value: any;
    onChange: any;
  };
  label: string;
  children: any;
}) {
  return (
    <Section
      test-id={`${field.name}-section`}
      className={field.isEdited ? "editing" : ""}
    >
      <div className="setting-name">
        <span className="setting-name-label placeholder">{label}</span>
      </div>
      <div className="placeholder">
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            value: field.value,
            onChange: field.onChange,
            "test-id": `${field.name}-input`,
          });
        })}
      </div>
    </Section>
  );
}

type XYZ<T extends object, K extends keyof T, V extends T[K]> = {
  name: K;
  value: V;
  isEdited: Boolean;
  onChange: (_: V) => void;
};

type ABC = {
  [K in keyof UserSettingsType]: XYZ<UserSettingsType, K, UserSettingsType[K]>;
};

type Props = {
  fields: ABC;
  onSubmit: any;
};

export default function UserSettingsPure({ fields, onSubmit }: Props) {
  const isLoading = React.useContext(LoadingContext);
  const UserSettings = isLoading ? UserSettingsLoading : UserSettingsSuccess;
  return (
    <UserSettings>
      <SectionComponent
        field={{
          ...fields.citiesPaginationPageSize,
          name: "citiesPaginationPageSize",
        }}
        label="Pagination Page Size"
      >
        <NumberInput step="1" />
      </SectionComponent>
      <SectionComponent
        field={{
          ...fields.foo,
          name: "foo",
        }}
        label="Foo parameter"
      >
        <TextInput />
      </SectionComponent>
      <SectionComponent
        field={{
          ...fields.bar,
          name: "bar",
        }}
        label="Bar parameter"
      >
        <NumberInput step="1" />
      </SectionComponent>
      <div className="button-box">
        <span className="placeholder">
          <SubmitButton
            onClick={onSubmit}
            test-id="submit-button"
            className={
              Object.values(fields).some((field: any) => field.isEdited)
                ? "editing"
                : ""
            }
          >
            Sync
          </SubmitButton>
        </span>
      </div>
    </UserSettings>
  );
}
