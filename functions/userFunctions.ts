/**
 * Returns the username of the user
 * @param userId of userin email format
 * @returns
 */
export const capitalizeAndGetUsername = (userId: string) => {
	const usernameUntilSymbol = userId.substring(0, userId.indexOf("@"));
	return usernameUntilSymbol.charAt(0).toLocaleUpperCase() + usernameUntilSymbol.slice(1);
};
