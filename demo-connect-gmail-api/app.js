const {google} = require('googleapis');
const credentials = require('../credentials.json');

// Use the google.auth.fromJSON method to create an OAuth2 client from the credentials file:
const auth = new google.auth.OAuth2();
auth.fromJSON(credentials);

auth.scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

