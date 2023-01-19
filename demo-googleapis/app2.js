const {google} = require('googleapis');
const credentials = require('../credentials.json');
const apis = google.getSupportedAPIs();



const YOUR_CLIENT_ID = credentials.installed.client_id
const YOUR_CLIENT_SECRET = credentials.installed.client_secret
const YOUR_REDIRECT_URL = credentials.installed.redirect_uris.join(', ')

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});
