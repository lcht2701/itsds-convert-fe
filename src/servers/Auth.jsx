import { axios } from "axios";
import { baseUrl } from "../servers/Link";

function Login() {
  try {
    const response = axios.get(`${baseUrl}/login`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error appropriately (e.g., display an error message)
    return null; // Or throw an error if needed
  }
}
