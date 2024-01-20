import { AccessTokenResponse } from "../types/types";
import { API_URL } from "./authConstants";

export default async function requestNewAccessToken(refreshToken: string) {
  const response = await fetch(`${API_URL}/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
        refresh:refreshToken }),
  });
  
  if (response.ok) {
    const json = (await response.json()) as AccessTokenResponse;

    if (json.error) {
      throw new Error(json.error);
    }
    console.log("llego pero no se que es",json.access);
    return json.access;
  } else {
    throw new Error("Unable to refresh access token.");
  }
}