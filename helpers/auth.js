export const LINKEDIN_STATE =
  "a_random_string_that_is_really_difficult_and_random";
export const LINKEDIN_SCOPE = "r_liteprofile r_emailaddress";
export const LINKEDIN_REDIRECT = "http://localhost:3000/api/oauth";
export const LINKEDIN_CLIENT_ID = "777yfrxrbhh88c";
export const LINKEDIN_CLIENT_SECRET = "8s0BFA1RBjLxUmPQ";

export const getURLWithQueryParams = (base, params) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${base}?${query}`;
};

export const LINKEDIN_URL = getURLWithQueryParams(
  "https://www.linkedin.com/oauth/v2/authorization",
  {
    response_type: "code",
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri: LINKEDIN_REDIRECT,
    state: LINKEDIN_STATE,
    scope: LINKEDIN_SCOPE,
  }
);
