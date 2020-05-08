import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import LoadingContext, { placeholderCssMixin } from "../LoadingContext";
import UpdateUserSettingsMutation from "../mutations/UpdateUserSettingsMutation";
import { NumberInput, TextInput } from "../elements/Inputs";
import { SubmitButton } from "../elements/Buttons";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { UpdateUserSettingsInput } from "__relay__/UpdateUserSettingsMutation.graphql";

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

type Props = {
  user: UserSettings_user;
  relay: any;
};

export const UserSettingsComponent = ({ user, relay }: Props) => {
  const [locCache, setLocCache] = useState(user.settings);

  const isLoading = React.useContext(LoadingContext);
  const UserSettings = isLoading ? UserSettingsLoading : UserSettingsSuccess;
  //console.log("UserSettingsComponent", user.settings, locCache);

  const prevUserSettings = useRef<string | null>(null);

  useEffect(() => {
    const jsoned = JSON.stringify(user.settings);
    if (prevUserSettings.current !== jsoned) {
      if (prevUserSettings.current) {
        setLocCache(user.settings);
      }
      prevUserSettings.current = jsoned;
    }
  });

  const diff = (attr: keyof UserSettingsType | null) => {
    if (attr) {
      return user.settings[attr] !== locCache[attr];
    }
    return (
      Object.keys(user.settings)
        //@ts-ignore
        .map((attr) => user.settings[attr] !== locCache[attr])
        .some(Boolean)
    );
  };

  const makeHandler = (
    param: keyof UserSettingsType,
    transform: (_: string) => any = (x) => x
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = transform(e.target.value);
      setLocCache({
        ...locCache,
        [param]: value,
      });
    };
  };

  const handleSubmit = () => {
    const diff: Omit<UpdateUserSettingsInput, "userId"> = {};
    for (let attr of Object.keys(user.settings)) {
      //@ts-ignore
      if (locCache[attr] !== user.settings[attr]) {
        //@ts-ignore
        diff[attr] = locCache[attr];
      }
    }
    const isDiffReal = Object.values(diff).filter(Boolean).length > 0;
    if (isDiffReal) {
      UpdateUserSettingsMutation.commit({
        environment: relay.environment,
        input: {
          userId: user.id,
          ...diff,
        },
        currentSettings: user.settings,
      });
    }
  };

  function SectionComponent({
    field,
    label,
    children,
  }: {
    field: keyof UserSettingsType;
    label: string;
    children: any;
  }) {
    return (
      <Section
        test-id={`${field}-section`}
        className={diff(field) ? "editing" : ""}
      >
        <div className="setting-name">
          <span className="setting-name-label placeholder">{label}</span>
        </div>
        <div className="placeholder">{children}</div>
      </Section>
    );
  }

  return (
    <UserSettings>
      <SectionComponent
        field="citiesPaginationPageSize"
        label="Pagination Page Size"
      >
        <NumberInput
          step="1"
          value={locCache["citiesPaginationPageSize"]}
          onChange={makeHandler("citiesPaginationPageSize", Number)}
          test-id="citiesPaginationPageSize-input"
        />
      </SectionComponent>
      <SectionComponent field="foo" label="Foo parameter">
        <TextInput
          value={locCache["foo"]}
          onChange={makeHandler("foo")}
          test-id="foo-input"
        />
      </SectionComponent>
      <SectionComponent field="bar" label="Bar parameter">
        <NumberInput
          step="1"
          value={locCache["bar"]}
          onChange={makeHandler("bar", Number)}
          test-id="bar-input"
        />
      </SectionComponent>
      <div className="button-box">
        <span className="placeholder">
          <SubmitButton
            onClick={handleSubmit}
            test-id="submit-button"
            className={diff(null) ? "editing" : ""}
          >
            Sync
          </SubmitButton>{" "}
        </span>
      </div>
    </UserSettings>
  );
};

export default createFragmentContainer(UserSettingsComponent, {
  user: graphql`
    fragment UserSettings_user on User {
      id
      settings {
        citiesPaginationPageSize
        foo
        bar
      }
    }
  `,
});

export const defaultData = {
  __typename: "User",
  id: "1",
  settings: {
    citiesPaginationPageSize: 5,
    foo: "",
    bar: 1,
  },
};
