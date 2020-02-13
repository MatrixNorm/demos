import React, { useCallback, useMemo, useRef } from "react";
import { commitLocalUpdate, fetchQuery } from "relay-runtime";
import { createFragmentContainer, graphql } from "react-relay";
import { Machine, interpret } from "xstate";
import { useService } from "@xstate/react";
import styled from "styled-components";
import Suggest from "theproject/ui/suggestion_list_loading_on_typing_xstate/App.js";
import { machineDef } from "theproject/ui/suggestion_list_loading_on_typing_xstate/machine";

const WithStyle = styled.div`
  .suggestions-list {
    padding: 0;
    margin: 0;
  }

  [data-is_pointed="true"] {
    background-color: #7cbd67;
  }
`;

function SelectCountryWidget({ value, relay }) {
  console.log("SelectCountryWidget", value);
  const currentValue = useRef(value.country);

  const onCountryUpdate = useCallback(country => {
    commitLocalUpdate(relay.environment, store => {
      const citySearchParams = store.get("client:UICitySearchParams");
      citySearchParams.setValue(country, "country");
    });
  });

  const service = useMemo(() => {
    const query = graphql`
      query SelectCountryWidgetQuery($searchString: String) {
        countries(searchString: $searchString)
      }
    `;

    const fetchItems = function(searchString) {
      return fetchQuery(relay.environment, query, { searchString }).then(
        data => {
          return { items: data.countries };
        }
      );
    };

    const machine = Machine(
      machineDef({
        machineId: "suggestionMachine",
        initialInputValue: value.country || ""
      }),
      {
        services: {
          fetchService: ctx => fetchItems(ctx.inputValue)
        },
        guards: {
          isQueryValid: () => true
        },
        delays: {
          TYPING_DEBOUNCE_DELAY: 500
        }
      }
    );

    const service = interpret(machine).onTransition(state => {
      if (state.changed && state.value === "idle") {
        let { inputValue } = state.context;
        if (inputValue !== currentValue.current) {
          currentValue.current = inputValue;
          onCountryUpdate(inputValue);
        }
      }
    });
    service.start();
    return service;
  }, []);

  const [current, send] = useService(service);

  return (
    <WithStyle>
      <Suggest current={current} send={send} />
    </WithStyle>
  );
}

export default createFragmentContainer(SelectCountryWidget, {
  value: graphql`
    fragment SelectCountryWidget_value on UICitySearchParams {
      country
    }
  `
});
