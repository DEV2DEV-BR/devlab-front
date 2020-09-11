import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormAboutMe from '../../components/FormAboutMe';
import FormLanguages from '../../components/FormLanguages';
import FormProfessionalExperience from '../../components/FormProfessionalExperience';

const ProfileItems = ({ modalShow, handleClose, option }) => {
  return (
    <Modal
      show={modalShow}
      onHide={() => handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {option === 'aboutMe' && 'Sobre Mim'}
          {option === 'skills' && 'Skills'}
          {option === 'professionalExperience' && 'Experiências profisionais'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {option === 'aboutMe' && <FormAboutMe />}
        {option === 'skills' && <FormLanguages />}
        {option === 'professionalExperience' && <FormProfessionalExperience />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileItems;
