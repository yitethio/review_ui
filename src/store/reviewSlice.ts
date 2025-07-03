import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import Cookies from 'js-cookie';

interface Institution {
  _id: string;
  name: string;
  location: string;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  user: string;
  institution: Institution;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Add to your imports


// Add to your state interface
interface ReviewState {
  reviews: Review[];
  userReviews: Review[];
  loading: boolean;
  error: string | null;
}

// Add to initialState
const initialState: ReviewState = {
  reviews: [],
  userReviews: [],
  loading: false,
  error: null,
};

// Add new async thunk
export const getUserReviews = createAsyncThunk(
  'reviews/getUserReviews',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const userId = Cookies.get('userId');
      console.log('Making API request with userId:', userId); // Debug log
      console.log('Token:', token); // Debug log
      
      if (!userId) throw new Error('User ID not found');
      
      const response = await fetch(`https://review-backend-aqeh.onrender.com/reviews/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch user reviews');
      const data = await response.json();
      console.log('API response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Error in getUserReviews:', error); // Debug log
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Add createReview async thunk after getUserReviews
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch('https://review-backend-oeph.onrender.com/reviews', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });
      
      if (!response.ok) throw new Error('Failed to create review');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Add to your selectors
export const selectUserReviews = (state: RootState) => state.reviews.userReviews;

// Add to extraReducers
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
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
      })
      .addCase(getUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserReviews.fulfilled, (state, action) => {
        state.userReviews = action.payload;
        state.loading = false;
      })
      .addCase(getUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const selectLoading = (state: RootState) => state.reviews.loading;
export const selectError = (state: RootState) => state.reviews.error;

export default reviewSlice.reducer;