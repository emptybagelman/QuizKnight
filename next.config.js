/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL
    },
    webpack(config, options) {
        config.module.rules.push({
          test: /\.(mp3)$/,
          // type: "asset/resource",
          // generator: {
          //   filename: "static/chunks/[path][name].[hash][ext]",
          // },
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/sounds/',
              outputPath: 'static/sounds/',
              name: '[name].[ext]',
              esModule: false,
            },
          },
        });
    
        return config;
      },
};

export default config;
