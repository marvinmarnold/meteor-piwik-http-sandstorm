Package.describe({
  name: 'marvin:piwik-http-sandstorm',
  version: '0.0.1',
  summary: 'Connect to a Piwik instance (grain) hosted on a Sandstorm server.',
  git: 'https://github.com/marvinmarnold/meteor-piwik-http-sandstorm',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1');
  api.use(['ecmascript', 'http', 'underscore', 'accounts-base', 'random']);
  api.mainModule('piwik-http-sandstorm.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('marvin:piwik-http-sandstorm');
  api.mainModule('piwik-http-sandstorm-tests.js');
});
