module.exports = {
  'plugins': [
    require('tailwindcss')(require('@project/tailwind')),
    require('postcss-nested'),
    require('autoprefixer')
  ]
}