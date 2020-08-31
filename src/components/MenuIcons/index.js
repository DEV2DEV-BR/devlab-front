import React from 'react';
import { Container, ContentItem } from './styles';
import DeveloperIcon from '../../assets/developer.svg';

function MenuIcons(props) {
  return (
    <Container>
      <ContentItem to="/recruiter">
        <img src={DeveloperIcon} alt="developers" />
        Encontrar programadores
      </ContentItem>
    </Container>
  );
}

export default MenuIcons;
