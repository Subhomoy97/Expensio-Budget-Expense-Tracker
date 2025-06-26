// Extract the date from a given date string and format it (optional, you can customize this as needed)
export const extractDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

// Get a color based on the category for visualization
export const getCategoryColor = (category) => {
  const categoryColors = {
    "Food": "#FF6347", // Tomato red
    "Transport": "#3CB371", // Medium Sea Green
    "Entertainment": "#1E90FF", // Dodger Blue
    "Utilities": "#FFD700", // Gold
    "Health": "#8A2BE2", // BlueViolet
    "Shopping": "#FF1493", // Deep Pink
    // Add more categories as needed
  };

  // Default color if the category is not in the list
  return categoryColors[category] || "#808080"; // Gray
};
