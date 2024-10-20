import apiInstance from "./axiosInstance";

/**
 *
 * AUTH (USER)
 *
 */

const authEndPoints = {
	signin: "/api/auth/login",
	getUser: "/api/auth/users/", // takes user id as well (getUser + userId)
};

export const signIn = async (email: string, password: string) => {
	console.log(`Signing in ${email} and ${password}...\n`);
	try {
		const requestBody = {
			email: email,
			password: password,
		};
		const response = await apiInstance.post(authEndPoints.signin, requestBody);
		console.log(response);
		return response;
	} catch (err) {
		throw err;
	}
};
