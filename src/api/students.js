// Base URL for your json-server
const API_BASE_URL = "http://localhost:8000";

// Helper function to handle fetch errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: "An error occurred",
    }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch students: ${error.message}`);
  }
};

// Get single student by ID (with campus if json-server supports _expand)
export const getStudentById = async (studentId) => {
  try {
    // json-server supports _expand to include parent resource
    const response = await fetch(
      `${API_BASE_URL}/students/${studentId}?_expand=campus`
    );
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch student: ${error.message}`);
  }
};

// Create new student
export const createStudent = async (studentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...studentData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to create student: ${error.message}`);
  }
};

// Update student
export const updateStudent = async (studentId, studentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...studentData,
        updatedAt: new Date().toISOString(),
      }),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to update student: ${error.message}`);
  }
};

// Delete student
export const deleteStudent = async (studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to delete student: ${error.message}`);
  }
};

// Get students by campus
export const getStudentsByCampus = async (campusId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/students?campusId=${campusId}`
    );
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch students by campus: ${error.message}`);
  }
};
