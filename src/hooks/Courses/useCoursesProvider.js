import React, { useState } from 'react';

function useCoursesProvider() {
  const [courses, setCourses] = useState([]);

  return {
    courses,
    setCourses
  }
}

export default useCoursesProvider;
