/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","index.html","contact.html"],
  theme: {
    extend: {
      fontFamily: {
        'Sans': ['Poppins', 'sans-serif'],
        'serif' : ['Merriweather', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

