import { MdCancel } from "react-icons/md";
import styled from "styled-components";
import Center from "./Center";
import Header from "./Header";
import { Box, ColumnsWrapper } from "./styles/CartStyles";

const StyledMcCancel = styled(MdCancel)`
  font-size: 25px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const StyledBox = styled(Box)`
  width: 70%;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export default function CancelMessage({ canceled }) {
  // function component with canceled prop that will be true if payment was canceled
  if (!canceled) {
    //if payment was not canceled return null
    return null;
  }

  return (
    // if payment was canceled return cancel message
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <StyledBox>
            <StyledDiv>
              <div>Payment was canceled</div>
              <div>
                <StyledMcCancel />
              </div>
            </StyledDiv>
          </StyledBox>
        </ColumnsWrapper>
      </Center>
    </>
  );
}
