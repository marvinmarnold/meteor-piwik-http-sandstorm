// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-piwik-http-sandstorm.js.
import { name as packageName } from "meteor/marvin:meteor-piwik-http-sandstorm";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-piwik-http-sandstorm - example', function (test) {
  test.equal(packageName, "meteor-piwik-http-sandstorm");
});
