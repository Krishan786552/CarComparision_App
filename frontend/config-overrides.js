// made use react-rewired to change the material ui styled engine to StyledComponenets
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias['@mui/styled-engine'] = '@mui/styled-engine-sc';
  return config;
}