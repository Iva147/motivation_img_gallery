import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
import getPort from "get-port";

/*
** env - variables you set by "--env" in package.json(e.g. --env prod mode=production)
** argv - build variables in webpack you set/change in package.json (e.g. --mode=production)
*/

export default async function  (env, argv) {
  console.log({ argv })
  const mode = argv.mode || 'development'
  const __isDEV__ = mode === 'development'

  console.log({ __isDEV__, mode })

  /*
  ** Not required. By default - 'web'.
  ** You can config it by  'browserlist' in separate file
  */
  const target = __isDEV__ ? 'web' : 'browserlist'

  const port = await getPort({ port: 3000 })

  return {
    mode: mode,
    entry: {
      index: path.resolve(process.cwd(), 'src', 'scripts', 'index.js')
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(process.cwd(), 'dist'),
      clean: true,
    },
    /*target,*/
    devtool: __isDEV__ ? 'source-map' : undefined,
    devServer: {
      port,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '~': path.resolve(process.cwd(), 'src/')
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), "src/index.html"),
        filename: "index.html",
        minify: true,
        imagePaths: {
          img1: './images/1.png'
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(c|sc|sa)ss$/i,
          use: [
            __isDEV__ && !env.build ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              /* for autoprefixer, optimization, minimization */
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    ["postcss-preset-env"],
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(process.cwd(), 'src/')],
                },
              },
            }
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|avif|webp)$/i,
          type: 'asset/resource',
          exclude: /\(glow|light\).(png|svg|jpg|jpeg|gif|avif|webp)$/i,
          generator: {
            filename: "images/[name].[contenthash][ext]"
          },
          use: [
            {
              loader: ImageMinimizerPlugin.loader,
              options: {
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                    plugins: [
                      "imagemin-gifsicle",
                      "imagemin-jpegtran",
                      "imagemin-optipng",
                      ["imagemin-svgo", {
                        plugins: [
                          {
                            name: "preset-default",
                            params: {
                              overrides: {
                                removeViewBox: false,
                                removeScriptElement: false,
                                removeUselessStrokeAndFill: false, // Preserve strokes and fills
                                cleanupIDs: false, // Preserve IDs
                                removeDimensions: false, // Preserve width and height attributes
                                addAttributesToSVGElement: {
                                  params: {
                                    attributes: [
                                      { xmlns: "http://www.w3.org/2000/svg" },
                                    ],
                                  },
                                },
                              },
                            },
                          },
                        ]
                      }]

                      //"imagemin-svgo",
                    ],
                  },
                }
              }
            },
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: "fonts/[name].[contenthash][ext]"
          }
        },
        {
          test: /\.mp(3|4)$/i,
          type: 'asset/resource',
          generator: {
            filename: "media/[name].[contenthash][ext]"
          }
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
  };
}