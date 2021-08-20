const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      offline: true,
      mode: "production",
    },
    argv
  );
  // Customize the config before returning it.
  return config;
};
