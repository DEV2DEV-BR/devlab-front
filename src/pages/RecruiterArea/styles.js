import { Container, Button } from '@material-ui/core';
import styled from 'styled-components';
import { customizations } from '../../configs/customizations';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledHr = styled.hr`
  width: 100%;
  border-top: 1px solid #45c 0.3;
`;

export const LeftBar = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  height: 100vh;
  align-items: center;
  justify-content: flex-start;
  width: 28%;
  background-color: #f7f2f2;

  span {
    margin-bottom: 12px;
  }

  h5 {
    text-align: center;
  }
  p {
    color: #b2adad;
  }

  ul {
    width: 100%;
    list-style: none;
    padding: 0px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const ContentTypes = styled.div`
  display: flex;
  flex-direction: row;
  span {
    font-size: 10px;
    margin: 0;
    padding: 0;
  }
`;

export const SpaceBar = styled.div`
  height: 30px;

  @media (max-width: 450px) {
    height: 0px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10px;
`;

export const StyledContentTop = styled.div`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  color: #fff;
  background-color: ${customizations?.primaryColor};
  text-align: center;
`;

export const StyledBanner = styled.img`
  width: 100%;
  margin: 0px;
`;
