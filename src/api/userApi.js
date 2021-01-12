import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/users/";

export function getYourself(accessToken) {
  return fetch(process.env.REACT_APP_API_URL + "/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

//

export function getProducts(params = []) {
  let queryString = "?";
  Object.keys(params).forEach(
    (key) => (queryString += `${key}=${params[key]}&`)
  );
  return fetch(baseUrl + queryString)
    .then(handleResponse)
    .catch(handleError);
}
//
export async function getProduct(id) {
  return await fetch(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
}

export function saveUser(accessToken, user) {
  return fetch(baseUrl + (user.id || ""), {
    method: user.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      // Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(accessToken, productId) {
  return fetch(baseUrl + productId, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(handleResponse)
    .catch(handleError);
}
