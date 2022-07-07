export const logout = () => {
  const keysToRemove = ['root', 'Authorization', 'globalTheme', 'isAuthenticated', 'initialDate'];
  keysToRemove.forEach((key) => localStorage.removeItem(key));
  Response.redirect('/login');
};