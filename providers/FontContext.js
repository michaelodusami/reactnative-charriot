import React, { createContext, useContext, useState } from "react";

const FontContext = createContext();

export const FontProvider = ({ children }) => {
	const [dyslexiaMode, setDyslexiaMode] = useState(false);

	const toggleDyslexiaMode = () => {
		setDyslexiaMode((prev) => !prev);
	};

	return (
		<FontContext.Provider value={{ dyslexiaMode, toggleDyslexiaMode }}>
			{children}
		</FontContext.Provider>
	);
};

export const useDyslexia = () => {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error("useDyslexia must be used within a FontProvider");
	}
	return context;
};
