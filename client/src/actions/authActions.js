export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';

export const setAuthenticated = () => ({
  type: SET_AUTHENTICATED,
});

export const setUnauthenticated = () => ({
  type: SET_UNAUTHENTICATED,
});