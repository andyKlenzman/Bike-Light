const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    clearLocalUser(state, action) {
      return {
        ...state,
        userArray: {
          pid: null,
          name: null,
          email: null,
        },
      };
    },
  },
  extraReducers: {},
});
