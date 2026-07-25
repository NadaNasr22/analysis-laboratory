// Login
export const login = async (email, password) => {
  // هنضيف axios هنا لما الـ Backend يجهز
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};

// Check Login
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};