import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as campusAPI from "../api/campuses";

const initialState = {
  campusesById: {},
  allIds: [],
  loading: false,
  error: null,
  currentCampus: null,
};

// Async Thunks
export const fetchAllCampuses = createAsyncThunk(
  "campuses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const campuses = await campusAPI.getAllCampuses();
      return campuses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCampusById = createAsyncThunk(
  "campuses/fetchById",
  async (campusId, { rejectWithValue }) => {
    try {
      const campus = await campusAPI.getCampusById(campusId);
      return campus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCampus = createAsyncThunk(
  "campuses/add",
  async (campusData, { rejectWithValue }) => {
    try {
      const newCampus = await campusAPI.createCampus(campusData);
      return newCampus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCampus = createAsyncThunk(
  "campuses/update",
  async ({ campusId, campusData }, { rejectWithValue }) => {
    try {
      const updatedCampus = await campusAPI.updateCampus(campusId, campusData);
      return updatedCampus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCampus = createAsyncThunk(
  "campuses/delete",
  async (campusId, { rejectWithValue }) => {
    try {
      await campusAPI.deleteCampus(campusId);
      return campusId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campusSlice = createSlice({
  name: "campuses",
  initialState,
  reducers: {
    clearCurrentCampus: (state) => {
      state.currentCampus = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Campuses
      .addCase(fetchAllCampuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCampuses.fulfilled, (state, action) => {
        state.loading = false;
        state.campusesById = {};
        state.allIds = [];
        action.payload.forEach((campus) => {
          state.campusesById[campus.id] = campus;
          state.allIds.push(campus.id);
        });
      })
      .addCase(fetchAllCampuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Campus By ID
      .addCase(fetchCampusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampusById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCampus = action.payload;
        state.campusesById[action.payload.id] = action.payload;
        if (!state.allIds.includes(action.payload.id)) {
          state.allIds.push(action.payload.id);
        }
      })
      .addCase(fetchCampusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Campus
      .addCase(addCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCampus.fulfilled, (state, action) => {
        state.loading = false;
        state.campusesById[action.payload.id] = action.payload;
        state.allIds.push(action.payload.id);
      })
      .addCase(addCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Campus
      .addCase(updateCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampus.fulfilled, (state, action) => {
        state.loading = false;
        state.campusesById[action.payload.id] = action.payload;
        if (state.currentCampus?.id === action.payload.id) {
          state.currentCampus = action.payload;
        }
      })
      .addCase(updateCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Campus
      .addCase(deleteCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCampus.fulfilled, (state, action) => {
        state.loading = false;
        delete state.campusesById[action.payload];
        state.allIds = state.allIds.filter((id) => id !== action.payload);
        if (state.currentCampus?.id === action.payload) {
          state.currentCampus = null;
        }
      })
      .addCase(deleteCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCampus, clearError } = campusSlice.actions;

// Selectors
export const selectAllCampuses = (state) =>
  state.campuses.allIds.map((id) => state.campuses.campusesById[id]);

export const selectCampusById = (state, campusId) =>
  state.campuses.campusesById[campusId];

export const selectCurrentCampus = (state) => state.campuses.currentCampus;

export const selectCampusesLoading = (state) => state.campuses.loading;

export const selectCampusesError = (state) => state.campuses.error;

export default campusSlice.reducer;
