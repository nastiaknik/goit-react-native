export const selectUser = ({ auth }) => auth.user;

export const selectIsLoggedIn = ({ auth }) => auth.isLoggedIn;

export const selectIsLoading = ({ auth }) => auth.isLoading;

export const selectError = ({ auth }) => auth.error;
