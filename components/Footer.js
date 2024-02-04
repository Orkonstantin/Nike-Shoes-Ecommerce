import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #222;
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 300;
  line-height: 0.1rem;
  letter-spacing: 0.05rem;
  text-align: center;
  padding: 1px 0;
  bottom: 0;
  width: 100%;

  @media (min-width: 576px) {
    font-size: 0.8rem;
  }
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const WrapperDive = styled.div`
  padding-top: 15px;
`;

function Footer() {
  return (
    <>
      <WrapperDive>
        <StyledFooter>
          <p>Or Konstantin &copy; {new Date().getFullYear()}</p>
        </StyledFooter>
      </WrapperDive>
    </>
  );
}

export default Footer;
