Add Piwik tracking to your Meteor app. Compatible with Sandstorm hosted Piwik.

# Installation
From your Meteor project's root directory.
````
// Copy the repo into the /packages folder
mkdir packages
cd packages
git clone https://github.com/marvinmarnold/meteor-piwik-http-sandstorm.git piwik

// Copy the example html file
cd piwik
cp example.html piwik.html

// Modify piwiki.html to include your tracking code

// Add the package to your project
cd ../..
meteor add marvin:piwik-http-sandstorm
````

## Usage
````
import { FlowRouter } from 'meteor/kadira:flow-router';
import { piwik } from 'meteor/marvin:piwik-http-sandstorm';

// To track page visits
FlowRouter.triggers.enter([piwik.flowTrackEnter]);

// To track actions
piwik.trackAction(categoryName, actionName)
````

## Documentation
http://developer.piwik.org/api-reference/tracking-api
