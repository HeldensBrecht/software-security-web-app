export async function handleResponse(response) {
  let toRespond = { status: response.status };
  if (response.ok) {
    if (response.status === 201) {
      return response.headers.get("Location");
    }
    try {
      toRespond.data = await response.json();
      return toRespond;
    } catch (e) {
      return;
    }
  }
  if (response.status === 404) {
    return toRespond;
  }
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
