import React, { useState, useEffect } from 'react';
import LeftBarWorkers from '../../components/LeftBarWorkers';
import { Body, StyledContainer } from './styles';
import WorkerCard from '../../components/WorkerCard';
import Container from '@material-ui/core/Container';
import firebase from 'firebase';

export default function Workers(props) {
  const [progress, setProgress] = useState(false);
  const [allStudents, setAllStudents] = useState([]);

  const loadMyStudents = () => {
    setProgress(true);

    async function fetchData() {
      const db = firebase.firestore();

      const studentsRef = db.collection('users').orderBy('name');

      const students = [];

      await studentsRef
        .where('userType', '==', 'student')
        .where('isRecruiter', '==', false)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              id,
              name,
              jobRole,
              profileImage,
              city,
              state,
              email,
              cellphone,
              skills,
              professionalExperience,
              aboutMe,
            } = doc.data();

            const studentObject = {
              id,
              name,
              jobRole,
              profileImage,
              city,
              state,
              email,
              cellphone,
              skills,
              professionalExperience,
              aboutMe,
            };
            students.push(studentObject);
          });

          setAllStudents(students);
          setProgress(false);
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error);
        });
    }

    fetchData();
  };

  useEffect(() => {
    loadMyStudents();
    return () => {
      setAllStudents('');
    };
  }, []);

  return (
    <>
      <StyledContainer>
        <LeftBarWorkers />
        <Container maxWidth="lg">
          <Body container spacing={4}>
            {allStudents?.map((student) => (
              <WorkerCard
                key={student.id}
                name={student?.name}
                profileImage={student?.profileImage}
                jobRole={student?.jobRole}
                state={student?.state}
                city={student?.city}
                email={student?.email}
                cellphone={student?.cellphone}
                aboutMe={student?.aboutMe}
                skills={student?.skills}
                professionalExperience={student?.professionalExperience}
                history={props.history}
              />
            ))}
          </Body>
        </Container>
      </StyledContainer>
    </>
  );
}
