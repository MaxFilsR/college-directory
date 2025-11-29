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

// Get all campuses
export const getAllCampuses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/campuses`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch campuses: ${error.message}`);
  }
};

// Get single campus by ID (with students if json-server supports _embed)
export const getCampusById = async (campusId) => {
  try {
    // json-server supports _embed to include related resources
    const response = await fetch(
      `${API_BASE_URL}/campuses/${campusId}?_embed=students`
    );
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to fetch campus: ${error.message}`);
  }
};

// Create new campus
export const createCampus = async (campusData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/campuses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...campusData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to create campus: ${error.message}`);
  }
};

// Update campus
export const updateCampus = async (campusId, campusData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/campuses/${campusId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...campusData,
        updatedAt: new Date().toISOString(),
      }),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Failed to update campus: ${error.message}`);
  }
};

// Delete campus
export const deleteCampus = async (campusId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/campuses/${campusId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    throw new Error(`Failed to delete campus: ${error.message}`);
  }
};
