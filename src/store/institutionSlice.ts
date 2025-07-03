import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Institution {
  id?: string;
  name: string;
  description: string;
  location: string;
  addedBy?: string;
  _id?: string;
  __v?: number;
}

interface InstitutionState {
  institutions: Institution[];
  selectedInstitution: Institution | null;
  loading: boolean;
  error: string | null;
}

const initialState: InstitutionState = {
  institutions: [],
  selectedInstitution: null,
  loading: false,
  error: null,
};

export const fetchInstitutions = createAsyncThunk(
  'institutions/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://review-backend-aqeh.onrender.com/institutions');
      if (!response.ok) {
        throw new Error('Failed to fetch institutions');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Failed to fetch institutions');
    }
  }
);

export const addInstitution = createAsyncThunk(
  'institutions/add',
  async (institutionData: FormData, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch('https://review-backend-aqeh.onrender.com/institutions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
        body: institutionData,
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to add institution');
      }

      return data;
    } catch (err) {
      return rejectWithValue(`Network error occurred ${err}`);
    }
  }
);

const institutionSlice = createSlice({
  name: 'institutions',
  initialState,
  reducers: {
    setInstitutions: (state, action: PayloadAction<Institution[]>) => {
      state.institutions = action.payload;
    },
    setSelectedInstitution: (state, action: PayloadAction<Institution | null>) => {
      state.selectedInstitution = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstitutions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutions.fulfilled, (state, action) => {
        state.institutions = action.payload;
        state.loading = false;
      })
      .addCase(fetchInstitutions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addInstitution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInstitution.fulfilled, (state, action) => {
        state.institutions.push(action.payload);
        state.loading = false;
      })
      .addCase(addInstitution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setInstitutions, setSelectedInstitution, clearError } = institutionSlice.actions;
export const selectInstitutions = (state: RootState) => state.institutions.institutions;
export const selectSelectedInstitution = (state: RootState) => state.institutions.selectedInstitution;
export const selectLoading = (state: RootState) => state.institutions.loading;
export const selectError = (state: RootState) => state.institutions.error;

export default institutionSlice.reducer;