import axios from "axios";
const API_URL = process.env.REACT_APP_LOCAL_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export async function deleteInvestment({ id, password }) {
  try {
    const res = await instance.delete(`api/investments/${id}`, {
      data: { password },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
