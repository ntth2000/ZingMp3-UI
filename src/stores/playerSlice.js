import { createSlice } from "@reduxjs/toolkit";

export const MUSIC_PLAYER = "player";
const removeAutoplay = (obj) => {
  const { autoplay, ...rest } = obj;
  return rest;
};
const initialState = JSON.parse(localStorage.getItem(MUSIC_PLAYER)) || {
  volume: 20,
  isPlaying: false,
  isFetching: false,
  fetchingStatus: null,
  error: null,
  source: "",
  autoplay: false,
  currentTime: 0,
  isLoop: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    setLoop: (state, action) => {
      state.isLoop = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    setAutoplay: (state, action) => {
      state.autoplay = action.payload;
    },
    toggleMusic: (state) => {
      state.isPlaying = !state.isPlaying;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    pauseMusic: (state) => {
      state.isPlaying = false;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    playMusic: (state) => {
      state.isPlaying = true;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    updateSource: (state, action) => {
      state.source = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    setSong: (state, action) => {
      state.playingSongId = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },

    setVolume: (state, action) => {
      state.volume = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    setFetchingStatus: (state, action) => {
      state.isFetching = action.payload.isFetching;
      state.error = action.payload.error;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
    setPrevVolume: (state, action) => {
      state.prevVolume = action.payload;
      localStorage.setItem(MUSIC_PLAYER, JSON.stringify(removeAutoplay(state)));
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
