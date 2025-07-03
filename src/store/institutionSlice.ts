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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInstitutions = createAsyncThunk(
  'institutions/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${process.env.NEXT_PUBLIC_INSTITUTIONS_URL}`);
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

export const createInstitution = createAsyncThunk(
  'institutions/create',
  async (institutionData: FormData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}${process.env.NEXT_PUBLIC_INSTITUTIONS_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      .addCase(createInstitution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInstitution.fulfilled, (state, action) => {
        state.institutions.push(action.payload);
        state.loading = false;
      })
      .addCase(createInstitution.rejected, (state, action) => {
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