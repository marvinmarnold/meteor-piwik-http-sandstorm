import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Random } from 'meteor/random';

if(Meteor.isServer) {
  Meteor.methods({
    'piwik.track': function(params) {
      console.log("Tracking a visit:");
      const endpoint = Meteor.settings.PIWIK.url
      const thiz = this
      const defaultParams = {
        idsite: 1,
        rec: 1,
        apiv: 1,
        cip: thiz.connection.clientAddress,
        ua: thiz.connection.httpHeaders["user-agent"],
        urlref: thiz.connection.httpHeaders["referer"],
        lang: thiz.connection.httpHeaders["accept-language"],
        rand: Random.id(),
        _id: Meteor.userId(),
        token_auth: Meteor.settings.PIWIK.tokenAuth
      }
      // console.log(defaultParams);

      if(endpoint) {
        _.defaults(params, defaultParams)
        console.log(params);

        HTTP.get(endpoint, {
          // headers: {"Authorization": "Bearer " + Meteor.settings.PIWIK.sandstormAuth},
          params,
        }, (err, resp) => {
          if(!err) {
            // console.log("Visit tracked on " + endpoint + " to " + params.url);
          } else {
            console.log("Error tracking");
            console.log(err);
            console.log(err.stack);
          }
        })
      }
      // console.log("Visit not tracked because PIWIKI.url is empty.");
      return {}
    }
  });
}

// FlowRouter triggersEnter hook to track
const flowTrackEnter = (context) => {
  // console.log('flowTrackEnter');
  // console.log(context.route.name);
  // console.log(context.oldRoute);

  // Don't track if page has not changed
  // if(context.oldRoute &&
  //   (context.oldRoute.name === context.route.name))
  //   return null

  const params = {
    url: Meteor.absoluteUrl(context.path.replace(/^\//,"")),
    action_name: context.route.name,
  }

  Meteor.call("piwik.track", params)
}

const trackAction = (path, action) => {
  const params = {
    url: Meteor.absoluteUrl(path),
    action_name: action,
  }

  Meteor.call("piwik.track", params)
}

export const piwik = {
  flowTrackEnter,
  trackAction
}
