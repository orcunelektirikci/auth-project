const htmlElement = document.querySelector('html')

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
  htmlElement.classList.add('dark')
else
  htmlElement.classList.remove('dark')
