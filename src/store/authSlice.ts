import { createSlice, createAsyncThunk,  } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  user: {
    id: string | null;
    name: string | null;
    email: string | null;
    verified: boolean;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get('token'),
  token: Cookies.get('token') || null,
  loading: false,
  error: null,
  user: {
    id: Cookies.get('userId') || null,
    name: Cookies.get('userName') || null,
    email: Cookies.get('userEmail') || null,
    verified: Cookies.get('userVerified') === 'true'
  }
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://review-backend-aqeh.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }

      // Store all user data in cookies
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('userId', data.user.id, { expires: 7 });
      Cookies.set('userName', data.user.name, { expires: 7 });
      Cookies.set('userEmail', data.user.email, { expires: 7 });
      Cookies.set('userVerified', String(data.user.verified), { expires: 7 });

      return { token: data.token, user: data.user };
    } catch (err) {
      console.error('Login error:', err);
      return rejectWithValue('Network error occurred');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://review-backend-aqeh.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Registration failed');
      }

      // Store all user data in cookies
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('userId', data.user.id, { expires: 7 });
      Cookies.set('userName', data.user.name, { expires: 7 });
      Cookies.set('userEmail', data.user.email, { expires: 7 });
      Cookies.set('userVerified', String(data.user.verified), { expires: 7 });

      return { token: data.token, user: data.user };
    } catch (err) {
      console.error('Registration error:', err);
      return rejectWithValue('Network error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = {
        id: null,
        name: null,
        email: null,
        verified: false
      };
      // Remove all cookies
      Cookies.remove('token');
      Cookies.remove('userId');
      Cookies.remove('userName');
      Cookies.remove('userEmail');
      Cookies.remove('userVerified');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          verified: action.payload.user.verified
        };
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = {
          id: action.payload.user.id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          verified: action.payload.user.verified
        };
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;