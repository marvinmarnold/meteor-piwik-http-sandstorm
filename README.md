# Setup
Modify `settings.json` to include:
````
{
  "public": {
    "PIWIK": {
      sandstormAuth: AUTHORIZATION_TOKEN_FROM_SANSTROM, // (see https://docs.sandstorm.io/en/latest/developing/http-apis/)
      url: GRAIN_URL_ON_SANDSTORM
    }
  }
}
````
# Installation
````
meteor add marvin:piwik-http-sandstorm
````
# Usage

## Standalone
````
import { piwik } from 'meteor/marvin:piwik-http-sandstorm'
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

piwik.track({
    url: "http://example.com" // REQUIRED
    action_name: "index",
    _id: Meteor.userId(),
    rand: Random.id()
  }, (err, resp) => {
    // Do something
})
````

## FlowRouter
````
import { FlowRouter } from 'meteor/kadira:flow-router';

import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

FlowRouter.triggers.enter([piwik.flowTrackEnter]);
````

## Documentation
http://developer.piwik.org/api-reference/tracking-api
