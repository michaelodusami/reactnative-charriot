import { useDyslexia } from "@/providers/FontContext";

export const getCurrentFontName = (isDyslexic: boolean) => {
	if (isDyslexic) {
		return "DyslexiaFont";
	} else {
		return "Poppins";
	}
};
