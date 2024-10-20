import { format } from "date-fns";

export const formatDisplayDate = (isoDate: any) => {
	const date = new Date(isoDate);

	// Format the date using date-fns to "MMMM d, yyyy 'at' hh:mm a"
	return format(date, "MMMM d, yyyy");
};
