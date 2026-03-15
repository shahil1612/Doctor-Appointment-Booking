/**
 * Calculate age from date of birth
 * @param {string} dob - Date of birth in ISO format
 * @returns {number} Age in years
 */
export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

/**
 * Format date to readable string
 * @param {string} date - Date in ISO format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Get initials from full name
 * @param {string} fullName - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (fullName) => {
  if (!fullName) return "??";

  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
