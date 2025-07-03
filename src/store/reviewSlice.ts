import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Review {
  id: string;
  userId: string;
  institutionId: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  _v: number;
}

interface ReviewState {
  reviews: Review[];
  userReviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  userReviews: [],
  loading: false,
  error: null,
};

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (formData: FormData, { rejectWithValue,getState }) => {
    try {
      const state = getState() as { auth: { token: string } };
      const response = await fetch('https://review-backend-aqeh.onrender.com/reviews', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create review');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    setUserReviews: (state, action: PayloadAction<Review[]>) => {
      state.userReviews = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
        state.userReviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setReviews, setUserReviews, setLoading, setError } = reviewSlice.actions;
export const selectReviews = (state: RootState) => state.reviews.reviews;
export const selectUserReviews = (state: RootState) => state.reviews.userReviews;
export const selectLoading = (state: RootState) => state.reviews.loading;
export const selectError = (state: RootState) => state.reviews.error;

export default reviewSlice.reducer;