import React, { createContext, useContext, useState } from "react";

// Create UserContext
const UserContext = createContext();

// Create UserProvider component
export const UserProvider = ({ children }) => {
	// Define the state for storing user information
	const [user, setUser] = useState({
		userId: null,
		accessToken: null,
	});

	// Function to update user information
	const updateUser = (userId, accessToken) => {
		setUser({ userId, accessToken });
	};

	// Function to clear user information (useful for logout)
	const clearUser = () => {
		setUser({ userId: null, accessToken: null });
	};

	// Value to provide to context consumers
	const value = {
		user,
		updateUser,
		clearUser,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to access UserContext
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
