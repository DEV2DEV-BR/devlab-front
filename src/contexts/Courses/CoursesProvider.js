import useCoursesProvider from '../../hooks/Courses/useCoursesProvider';
import CoursesContext from './CoursesContext';

export function CoursesProvider(props) {
  const valuesProvider = useCoursesProvider();

  return (
    <CoursesContext.Provider value={valuesProvider}>
      {props.children}
    </CoursesContext.Provider>
  )
}
