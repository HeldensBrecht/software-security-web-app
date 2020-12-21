import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_API_URL + "/products/";

// export function getProducts(accessToken) {
//   console.log(baseUrl);
//   return fetch(baseUrl, { headers: { Authorization: `Bearer ${accessToken}` } })
//     .then(handleResponse)
//     .catch(handleError);
// }

export function test(accessToken) {
  return fetch("http://localhost:3001/private", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(handleResponse)
    .catch(handleError);
}

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

export function saveProduct(accessToken, product) {
  console.log(product);
  return fetch(baseUrl + (product.id || ""), {
    method: product.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      // Accept: "application/json",
    },
    body: JSON.stringify(product),
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
