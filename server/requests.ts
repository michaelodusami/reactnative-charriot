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
		const response = await apiInstance.post(
			"https://p5vfoq23g5ps45rtvky2xydcxe0sbwph.lambda-url.us-east-1.on.aws/api/auth/login",
			requestBody
		);
		console.log(response.data);
		return response.data.access_token;
	} catch (err) {
		console.error("Error" + err);
		throw err;
	}
};

export const submitRequest = async (requestId: string, userEmail: string) => {
	console.log("I have been called");
	try {
	  const response = await apiInstance.post(
		`https://p5vfoq23g5ps45rtvky2xydcxe0sbwph.lambda-url.us-east-1.on.aws/api/request/${requestId}/${encodeURIComponent(userEmail)}`
	  );
	  console.log(response.data);
	  return response.data;
	} catch (err) {
	  console.error("Error submitting request:", err);
	  throw err;
	}
  };
