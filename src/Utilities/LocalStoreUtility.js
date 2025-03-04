export function getIsDarkMode() {
    let isDarkMode = false
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        isDarkMode = true
    }
    return isDarkMode
}