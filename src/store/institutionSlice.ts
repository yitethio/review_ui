import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
export default institutionSlice.reducer;