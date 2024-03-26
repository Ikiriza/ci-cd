const { override } = require('customize-cra');
const { addLessLoader } = require('customize-cra');

module.exports = override(
  // Use addLessLoader to modify Less loader options
  addLessLoader({
    lessOptions: {
      modifyVars: {
        "@layout-body-background": "#FFFFFF",
        "@layout-header-background": "#FFFFFF",
        "@layout-footer-background": "#FFFFFF"
      },
      javascriptEnabled: true
    }
  }),
  // You don't need to import antd styles manually, create-react-app does this automatically
);
