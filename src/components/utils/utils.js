export function changeTheme(newTheme) {
  localStorage.setItem("mode", newTheme);
  window.dispatchEvent(new Event("themeChanged"));
}
