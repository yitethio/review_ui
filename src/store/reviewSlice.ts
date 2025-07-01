import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Review {
  id: string;
  userId: string;
  institutionId: string;
  rating: number;
  content: string;
  createdAt: string;
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
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
      state.userReviews.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setReviews, setUserReviews, addReview, setLoading, setError } = reviewSlice.actions;
export default reviewSlice.reducer;