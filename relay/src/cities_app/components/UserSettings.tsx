import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { graphql, createFragmentContainer } from "react-relay";
import styled from "styled-components";
import UpdateUserSettingsMutation from "../mutations/UpdateUserSettingsMutation";
import { NumberInput, TextInput } from "../elements/Inputs";
import { SubmitButton } from "../elements/Buttons";
import { UserSettings_user } from "__relay__/UserSettings_user.graphql";
import { UpdateUserSettingsInput } from "__relay__/UpdateUserSettingsMutation.graphql";

type Props = {
  user: UserSettings_user;
  relay: any;
};
export type UserSettingsType = UserSettings_user["settings"];

export const UserSettings = styled.div``;
export const Section = styled.section`
  display: flex;
  min-height: 30px;

  .setting-name {
    flex: auto;
  }
`;

export const UserSettingsComponent = ({ user, relay }: Props) => {
  const [locCache, setLocCache] = useState(user.settings);
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

  return (
    <UserSettings>
      <Section
        test-id="citiesPaginationPageSize-section"
        className={diff("citiesPaginationPageSize") ? "editing" : ""}
      >
        <span className="setting-name">Pagination Page Size</span>
        <NumberInput
          step="1"
          value={locCache["citiesPaginationPageSize"]}
          onChange={makeHandler("citiesPaginationPageSize", Number)}
          test-id="citiesPaginationPageSize-input"
        />
      </Section>
      <Section test-id="foo-section" className={diff("foo") ? "editing" : ""}>
        <span className="setting-name">Foo</span>
        <TextInput
          value={locCache["foo"]}
          onChange={makeHandler("foo")}
          test-id="foo-input"
        />
      </Section>
      <Section test-id="bar-section" className={diff("bar") ? "editing" : ""}>
        <span className="setting-name">Bar</span>
        <NumberInput
          step="1"
          value={locCache["bar"]}
          onChange={makeHandler("bar", Number)}
          test-id="bar-input"
        />
      </Section>
      <SubmitButton
        onClick={handleSubmit}
        test-id="submit-button"
        className={diff(null) ? "editing" : ""}
      >
        Sync
      </SubmitButton>
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
