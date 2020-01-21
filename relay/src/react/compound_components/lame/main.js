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

function App({ data, tabsOnBottom, disabled }) {
  const [state, setState] = useState({ activeIndex: 0 });
  const onTabActivate = useCallback(index =>
    setState({ ...state, activeIndex: index })
  );

  const tabs = (
    <Tabs
      tabs={data}
      activeIndex={state.activeIndex}
      onActivate={onTabActivate}
      disabled={disabled}
    />
  );

  const panel = <Panel description={data[state.activeIndex].description} />;

  if (tabsOnBottom) {
    return (
      <>
        {panel}
        {tabs}
      </>
    );
  }
  return (
    <>
      {tabs}
      {panel}
    </>
  );
}

function Tabs({ tabs, activeIndex, onActivate, disabled }) {
  return tabs.map((tab, index) => {
    const isActive = activeIndex === index;
    const isDisabled = disabled.includes(index);
    return (
      <Tab
        key={tab.label}
        active={isActive && !isDisabled}
        disabled={isDisabled}
        onClick={isDisabled ? null : () => onActivate(index)}
      >
        {tab.label}
      </Tab>
    );
  });
}

function Panel({ description }) {
  return <p>{description}</p>;
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

ReactDOM.render(
  <App data={tabsData} tabsOnBottom={false} disabled={[1]} />,
  document.getElementById("app")
);
