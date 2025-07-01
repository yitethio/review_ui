import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Institution {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
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

const institutionSlice = createSlice({
  name: 'institutions',
  initialState,
  reducers: {
    setInstitutions: (state, action: PayloadAction<Institution[]>) => {
      state.institutions = action.payload;
    },
    setSelectedInstitution: (state, action: PayloadAction<Institution>) => {
      state.selectedInstitution = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setInstitutions, setSelectedInstitution, setLoading, setError } = institutionSlice.actions;
export default institutionSlice.reducer;