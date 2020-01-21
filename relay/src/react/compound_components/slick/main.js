import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Tab = styled.div`
  display: inline-block;
  margin: 5px;
  border-bottom: ${props => (props.active ? " 2px solid red" : "")};
  cursor: ${props => (props.disabled ? "auto" : "pointer")};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const Panel = styled.p`
  color: blue;
`;

function App() {
  return (
    <TabsPanel>
      <Tabs>
        <Tab active>Tacos</Tab>
        <Tab disabled>Burritos</Tab>
        <Tab>Coconut Korma</Tab>
      </Tabs>
      <Panels>
        <Panel>Tacos are delicious</Panel>
        <Panel>Sometimes a burrito is what you really need</Panel>
        <Panel>Might be your best option</Panel>
      </Panels>
    </TabsPanel>
  );
}

function TabsPanel({ children }) {
  const [state, setState] = useState({ activeIndex: 0 });
  return (
    <div>
      {React.Children.map(children, child => {
        if (child.type === Panels) {
          return React.cloneElement(child, { activeIndex: state.activeIndex });
        }
        return child;
      })}
    </div>
  );
}

function Tabs(props) {
  return <div>{props.children}</div>;
}

function Panels({ children, activeIndex }) {
  return <div>{children[activeIndex]}</div>;
}

const tabsData = [
  {
    label: "Tacos",
    description: "Tacos are delicious"
  },
  {
    label: "Burritos",
    description: "Sometimes a burrito is what you really need"
  },
  {
    label: "Coconut Korma",
    description: "Might be your best option"
  }
];

ReactDOM.render(<App />, document.getElementById("app"));
