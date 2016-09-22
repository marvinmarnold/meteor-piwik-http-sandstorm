import { Meteor } from 'meteor/meteor';

// FlowRouter triggersEnter hook to track
const flowTrackEnter = (context) => {
  const url = Meteor.absoluteUrl(context.path.replace(/^\//,""))
  _paq.push(['setDocumentTitle', context.route.name]);
  _paq.push(['setCustomUrl', url])
  _paq.push(['trackPageView']);
}

const trackAction = (category, action) => {
  _paq.push(['trackEvent', category, action])
}

export const piwik = {
  flowTrackEnter,
  trackAction
}
