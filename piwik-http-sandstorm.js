import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Random } from 'meteor/random';

// Notify Piwik that a specific URL has been visited
const track = (params, callback) => {
  const endpoint = Meteor.settings.public.PIWIK.url

  _.defaults(params, {
    idsite: 1,
    rec: 1,
    apiv: 1
  })

  if(endpoint) {
    return HTTP.get(endpoint, {
      headers: {"Authorization": "Bearer " + Meteor.settings.public.PIWIK.sandstormAuth},
      params
    }, callback)
  }

  return callback(undefined, {})
}

// FlowRouter triggersEnter hook to track
const flowTrackEnter = (context) => {
  // Don't track if page has not changed
  if(context.oldRoute &&
    (context.oldRoute.name === context.route.name))
    return

  const params = {
    url: Meteor.absoluteUrl(context.path.replace(/^\//,"")),
    action_name: context.route.name,
    _id: Meteor.userId(),
    rand: Random.id()
  }

  return track(params, (err, resp) => {
    if(!err)
      console.log("Visit tracked on " + Meteor.settings.public.PIWIK.url + " to " + params.url);
  })
}

export const piwik = {
  track,
  flowTrackEnter
}
