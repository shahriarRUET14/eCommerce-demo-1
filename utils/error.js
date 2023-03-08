const getError = (error) =>
  error.respononse && error.respononse.data && error.respononse.data.message
    ? error.respononse.data.message
    : error.message;
export { getError };
