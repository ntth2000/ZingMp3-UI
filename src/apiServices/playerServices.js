import axios from "axios";
import * as request from "~/utils/request";

export const fetchSong = async (songId) => {
  try {
    const res = await request.get("song/" + songId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchStreaming = async (songId) => {
  try {
    const res = await axios.get(process.env.REACT_APP_STREAMING_URL + songId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
