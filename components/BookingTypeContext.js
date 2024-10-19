import React, { createContext, useState, ReactNode, FC } from "react";

// Create the context with a default value (it will be overridden by the provider)
export const BookingTypeContext = createContext("");

// Create the provider component
export const BookingTypeProvider = ({ children }) => {
	const [bookingType, setBookingType] = useState("current");

	return (
		<BookingTypeContext.Provider value={{ bookingType, setBookingType }}>
			{children}
		</BookingTypeContext.Provider>
	);
};
