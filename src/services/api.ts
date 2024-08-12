import axios from "axios";
import { constants } from "../constants";

const api = axios.create({
  baseURL: constants.baseURL,
  headers: {
    Accept: "application/json, multipart/form-data",
  },
});

export async function putObject(payload) {
  const token = localStorage.getItem("accessToken");

  try {
    const rest = await api.post("/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return rest.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export async function getObjects() {
  const token = localStorage.getItem("accessToken");

  try {
    const rest = await api.get("/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return rest.data.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}
