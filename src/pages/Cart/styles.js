import styled from 'styled-components';
import { Container, Grid, FormControl, Badge } from '@material-ui/core';

export const StyledContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const InternalContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  align-items: center;
  justify-content: center;
`;
export const Main = styled.div`
  flex-grow: 1;
  height: 100vh;
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
