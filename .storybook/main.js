const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],

  webpackFinal: async (config) => {
    config.resolve.module.push(toPath('src'))

    config.resolve.adias['@emotion/core'] = toPath(
      'node_modules/@emotion/react'
    )
    config.resolve.adias['@emotion/styled'] = toPath(
      'node_modules/@emotion/styled'
    )
    config.resolve.adias['@emotion-theming'] = toPath(
      'node_modules/@emotion/react'
    )
    return config;
  },
}