import styled from "styled-components";

const CountCircle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #0d3d29;
  color: white;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const CartCountBubble = ({ count }) => {
  if (count >= 0) {
    return <CountCircle>{count}</CountCircle>;
  } else {
    return null;
  }
};

export default CartCountBubble;
