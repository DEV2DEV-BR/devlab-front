import React from 'react';
import useCoursesProvider from '../../hooks/Courses/useCoursesProvider';
import CoursesContext from './CoursesContext';

export default function CoursesProvider(props) {
  const valuesProvider = useCoursesProvider();

  return (
    <CoursesContext.Provider value={valuesProvider}>
      {props.children}
    </CoursesContext.Provider>
  )
}
