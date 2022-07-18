import * as request from "~/utils/request";

export const search = async (content) => {
  try {
    const res = await request.get(`search?q=${content}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const searchByType = async (content, type = "song", page = 1) => {
  try {
    const res = await request.get(
      `search-by-type?q=${content}&type=${type}&page=${page}`
    );
    console.log("inside search services", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
