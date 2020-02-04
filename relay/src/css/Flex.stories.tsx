import * as React from "react";
import styled from "styled-components";

export default {
  title: "Css-Flex"
};

const Base = styled.div`
  border: solid 2px black;
  .item {
    color: #fff;
    padding: 1em;
  }
  .item:nth-child(1) {
    background-color: brown;
  }
  .item:nth-child(2) {
    background-color: seagreen;
  }
  .item:nth-child(3) {
    background-color: skyblue;
  }
  .item:nth-child(4) {
    background-color: #e69809;
  }
  .item:nth-child(5) {
    background-color: grey;
  }
  .item:nth-child(6) {
    background-color: yellowgreen;
  }
`;

export const flex1 = () => {
  const Flex1 = styled(Base)`
    display: flex;
  `;

  const Flex2 = styled(Base)`
    display: inline-flex;
  `;

  const Flex3 = styled(Base)`
    display: inline-flex;
    flex-direction: row-reverse;
  `;

  const Flex4 = styled(Base)`
    display: inline-flex;
    flex-direction: column;
  `;
  return (
    <>
      <Flex1>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
      </Flex1>
      <br />
      <Flex2>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
      </Flex2>
      <br />
      <br />
      <Flex3>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
      </Flex3>
      <br />
      <br />
      <Flex4>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
      </Flex4>
    </>
  );
};

export const flex2 = () => {
  const Flex1 = styled(Base)`
    display: flex;
    width: 35%;

    .item {
      opacity: 0.8;
    }
  `;

  const Flex2 = styled(Base)`
    display: flex;
    flex-wrap: wrap;
    width: 35%;

    .item {
      opacity: 0.8;
    }
  `;
  const Flex3 = styled(Base)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 35%;
    height: 200px;

    .item {
      opacity: 0.8;
      width: 2em;
    }
  `;

  return (
    <>
      <Flex1>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
        <div className="item">item 4</div>
        <div className="item">item 5</div>
        <div className="item">item 6</div>
      </Flex1>
      <br />
      <Flex2>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
        <div className="item">item 4</div>
        <div className="item">item 5</div>
        <div className="item">item 6</div>
      </Flex2>
      <br />
      <Flex3>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
        <div className="item">item 4</div>
        <div className="item">item 5</div>
        <div className="item">item 6</div>
      </Flex3>
    </>
  );
};
