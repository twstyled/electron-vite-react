const { notarize } = require('electron-notarize')

exports.default = async function notarizing(context) {

  return
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  // // .replace(new RegExp('\\n', 'g'), '\n'),

  const appName = context.packager.appInfo.productFilename

  await notarize({
    appBundleId: 'com.twstyled.starter',
    appPath: `${appOutDir}/${appName}.app`,
    appleApiKey: process.env.AC_API_KEY,
    appleApiIssuer: process.env.AC_API_ISSUER
  })
}
