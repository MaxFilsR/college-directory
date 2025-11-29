import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as studentAPI from "../api/students";

const initialState = {
  studentsById: {},
  allIds: [],
  loading: false,
  error: null,
  currentStudent: null,
};

// Async Thunks
export const fetchAllStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const students = await studentAPI.getAllStudents();
      return students;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  "students/fetchById",
  async (studentId, { rejectWithValue }) => {
    try {
      const student = await studentAPI.getStudentById(studentId);
      return student;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  "students/add",
  async (studentData, { rejectWithValue }) => {
    try {
      const newStudent = await studentAPI.createStudent(studentData);
      return newStudent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ studentId, studentData }, { rejectWithValue }) => {
    try {
      const updatedStudent = await studentAPI.updateStudent(
        studentId,
        studentData
      );
      return updatedStudent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (studentId, { rejectWithValue }) => {
    try {
      await studentAPI.deleteStudent(studentId);
      return studentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Students
      .addCase(fetchAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsById = {};
        state.allIds = [];
        action.payload.forEach((student) => {
          state.studentsById[student.id] = student;
          state.allIds.push(student.id);
        });
      })
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Student By ID
      .addCase(fetchStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStudent = action.payload;
        state.studentsById[action.payload.id] = action.payload;
        if (!state.allIds.includes(action.payload.id)) {
          state.allIds.push(action.payload.id);
        }
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Student
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsById[action.payload.id] = action.payload;
        state.allIds.push(action.payload.id);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsById[action.payload.id] = action.payload;
        if (state.currentStudent?.id === action.payload.id) {
          state.currentStudent = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        delete state.studentsById[action.payload];
        state.allIds = state.allIds.filter((id) => id !== action.payload);
        if (state.currentStudent?.id === action.payload) {
          state.currentStudent = null;
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentStudent, clearError } = studentSlice.actions;

// Selectors
export const selectAllStudents = (state) =>
  state.students.allIds.map((id) => state.students.studentsById[id]);

export const selectStudentById = (state, studentId) =>
  state.students.studentsById[studentId];

export const selectCurrentStudent = (state) => state.students.currentStudent;

export const selectStudentsLoading = (state) => state.students.loading;

export const selectStudentsError = (state) => state.students.error;

// Select students by campus
export const selectStudentsByCampus = (state, campusId) =>
  state.students.allIds
    .map((id) => state.students.studentsById[id])
    .filter((student) => student.campusId === campusId);

export default studentSlice.reducer;
