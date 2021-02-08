const { dirname, join, resolve } = require('path')
const { plugins } = require('@project/config/postcss.config')

const rootDir = join(__dirname, '..', 'src')

const sharedDir = dirname(require.resolve('@project/shared'))
const componentsDir = resolve(sharedDir, 'components')
const pathToInlineSvg = resolve(componentsDir, 'src/statics/svg')
const pathToFonts = resolve(componentsDir, 'src/fonts')

module.exports = {
  'stories': [
    join(rootDir, '**/*.stories.mdx'),
    join(rootDir, '**/*.stories.@(js|jsx|ts|tsx)'),
    join(componentsDir, '**/*.stories.mdx'),
    join(componentsDir, '**/*.story.mdx'),
    join(componentsDir, '**/*.story.@(js|jsx|ts|tsx)'),
    join(componentsDir, '**/*.stories.@(js|jsx|ts|tsx)')
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  webpackFinal: (config) => {
    const rules = config.module.rules

    const svgLoaderRule = rules.find(rule => rule.test.test('.svg'))
    svgLoaderRule.exclude = pathToInlineSvg

    rules.forEach(rule => {
      if (rule.test.test('.css')) {
        rule.use[2] = {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins,
            sourceMap: true
          }
        }
      }

      if (rule.test.test('.js')) {
        rule.use[0].loader = require.resolve('babel-loader')
      }
    })

    rules.unshift({
      test: /\.svg$/,
      exclude: [
        `${pathToFonts}/**`
      ],
      use: [require.resolve('@svgr/webpack'), require.resolve('url-loader')]
    })

    return config
  }
}