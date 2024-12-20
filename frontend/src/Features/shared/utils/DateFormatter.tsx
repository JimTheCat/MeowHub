// TODO: Implement more rich status handling
export const DateFormatter = (date: string) => {
  // if date of last message is today, return only time
  // if date of last message is yesterday, return "Yesterday"
  // if date of last message is older than yesterday, return date in format "DD/MM/YYYY"

  const formattedDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (formattedDate.toDateString() === today.toDateString()) {
    // return without seconds
    return formattedDate.toLocaleTimeString().slice(0, -3);
  } else if (formattedDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return formattedDate.toLocaleDateString();
  }
}