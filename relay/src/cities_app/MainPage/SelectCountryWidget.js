import { fetchQuery, graphql } from "relay-runtime";
import React, { useMemo } from "react";
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

const query = graphql`
  query SelectCountryWidgetQuery($searchString: String) {
    countries(searchString: $searchString)
  }
`;

export default function Main({ relayEnvironment }) {
  const service = useMemo(() => {
    const fetchItems = function(searchString) {
      return fetchQuery(relayEnvironment, query, { searchString }).then(
        data => {
          return { items: data.countries };
        }
      );
    };

    const machine = Machine(machineDef({ machineId: "suggestionMachine" }), {
      services: {
        fetchService: ctx => fetchItems(ctx.inputValue)
      },
      guards: {
        isQueryValid: () => true
      },
      delays: {
        TYPING_DEBOUNCE_DELAY: 500
      }
    });

    const service = interpret(machine);
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
