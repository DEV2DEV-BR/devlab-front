import styled from 'styled-components';
import { Container, Grid, FormControl, Badge, Button } from '@material-ui/core';

export const StyledContainer = styled.div`
  width: 100%;
`;

export const InternalContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px 12% 0px 12%;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 85%;
  overflow: auto;
`;

export const StyledGrid = styled(Grid)`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
`;
export const StyledFormControl = styled(FormControl)`
  display: flex;
  border-width: 1px;
  border-color: rgba(198, 179, 179, 0.6);
  border-style: solid;
  margin: 10px;
  padding: 5px;
  border-radius: 4px;
`;

export const StyledImage = styled.img`
  width: 100px;
  height: 60px;
  border-radius: 5px;
`;

export const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;

  > p {
    color: #7a7171;
    margin: 0px;
    padding: 0px;
    font-size: 17px;
  }
`;

export const StyledBadge = styled(Badge)`
  align-items: center;
  font-size: 18;
  color: #ec5252;
  font-weight: bold;
`;

export const Checkout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

export const ContainerInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

export const StyledButton = styled(Button)`
  margin-top: 20px;
`;
