import styled from 'styled-components';
import { Container, Grid, FormControl } from '@material-ui/core';

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
  border-color: #c6b3b3;
  border-style: solid;
  border-radius: 4;
  margin: 10;
  padding: 5;
`;
