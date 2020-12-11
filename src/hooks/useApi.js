import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = (url, fetchOptions = {}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          scope: "openid profile email",
        });
        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          error,
          loading: false,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};