const calcStyleCompOptions = (isDev) => {
  const devOptions = { fileName: false };
  const prodOptions = { displayName: false, pure: true };

  return isDev ? devOptions : prodOptions;
};

module.exports = function (api) {
  const isDev = api.env('development');

  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
      ['babel-plugin-styled-components', calcStyleCompOptions(isDev)],
    ],
  };
};
