Package.describe({
  name: 'marvin:piwik-http-sandstorm',
  version: '0.0.1',
  summary: 'Connect to a Piwik instance (grain) hosted on a Sandstorm server.',
  git: 'https://github.com/marvinmarnold/meteor-piwik-http-sandstorm',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1');
  api.use(['ecmascript', 'static-html']);
  api.addFiles("piwik.html", "client")
  api.mainModule('piwik-http-sandstorm.js');
});
