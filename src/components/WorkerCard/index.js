import React from 'react';
import { Card, Name, StyledAvatar } from './styles';
import ProfileImage from '../../assets/profile.png';

function WorkerCard({ name, profileImage, jobRole, state, city, history }) {

  const redirectToProfile = () => {
    history.push('/public-profile', { name, profileImage, jobRole, state, city })
  }

  return (
    <Card onClick={redirectToProfile}>
      <StyledAvatar src={profileImage || ProfileImage} />
      <Name>{name}</Name>
      <strong>{jobRole || 'Desenvolvedor'}</strong>
      <span>
        {state || 'BR'}, {city || 'Brasil'}
      </span>
    </Card>
  );
}

export default WorkerCard;
