require('dotenv').config()
const Dotenv = require('dotenv-webpack')
const path = require('path')

const withPlugins = require('next-compose-plugins')
const sass = require('@zeit/next-sass')
const css = require('@zeit/next-css')

module.exports = withPlugins([
    [css],
    [sass]
  ],
  {
    webpack: config => {
      config.node = {
        fs: 'empty'
      }

      config.plugins = config.plugins || []

      config.plugins = [
        ...config.plugins,

        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      ]

      return config
    }
  },
  {
    env: {
      TEST: process.env.TEST
    }
  }
);
