import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Random } from 'meteor/random';

if(Meteor.isServer) {
  Meteor.methods({
    'piwik.track': function(params) {
      const endpoint = Meteor.settings.PIWIK.url

      if(endpoint) {
        _.defaults(params, {
          idsite: 1,
          rec: 1,
          apiv: 1,
          cip: this.connection.clientAddress,
          ua: this.connection.httpHeaders["user-agent"],
          urlref: this.connection.httpHeaders["referer"],
          lang: this.connection.httpHeaders["accept-language"],
          rand: Random.id(),
          _id: Meteor.userId()
        })
        console.log(params);
        console.log(endpoint);

        HTTP.get(endpoint, {
          headers: {"Authorization": "Bearer " + Meteor.settings.PIWIK.sandstormAuth},
          params,
        }, (err, resp) => {
          if(!err) {
            console.log("Visit tracked on " + endpoint + " to " + params.url);
          } else {
            console.log("Error tracking");
            console.log(err);
            console.log(err.stack);
          }
        })
      }

      return {}
    }
  });
}

// FlowRouter triggersEnter hook to track
const flowTrackEnter = (context) => {
  // Don't track if page has not changed
  if(context.oldRoute &&
    (context.oldRoute.name === context.route.name))
    return null

  const params = {
    url: Meteor.absoluteUrl(context.path.replace(/^\//,"")),
    action_name: context.route.name,
  }

  Meteor.call("piwik.track", params)
}

export const piwik = {
  flowTrackEnter
}
