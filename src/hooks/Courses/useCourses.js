import { useContext } from 'react';
import CoursesContext from '../contexts/Courses/CoursesContext';

function useCourses() {
  return useContext(CoursesContext);
}

export default useCourses;
