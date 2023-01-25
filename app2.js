/*
Programmer:     Eric Hepperle
Date:           01/24/23
Date Modified:  01/25/23

Purpose:
Print email senders using GMail REST API and Oauth2.

Based on: https://developers.google.com/drive/api/quickstart/nodejs

#GOTCHAS:
- Must delete token.json everytime or you will get "insufficient permissions" error
- The 'gmail' object must be defined after a valid auth client is found, so it can't be a 'global' 

Resources:
- https://www.fullstacklabs.co/blog/access-mailbox-using-gmail-node
- https://sigparser.com/developers/email-parsing/gmail-api/
- https://blog.gsmart.in/parse-and-extract-data-from-gmail-to-google-sheets/




Version: 2
*/

const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const { sep } = require('path');
// const cheerio = require('cheerio')

const separator_bar = '\n'.repeat(3) + '#'.repeat(50) + '\n'.repeat(2)


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const CREDENTIALS_PATH = path.join(`${__dirname}`, './private/gmail.credentials.json');


/// FUNCTIONS:  Authorize User

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}



/// FUNCTIONS:  Data Processing



/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.labels.list({
    userId: 'me',
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}


async function buildMessagesDict(auth) {

  const dict = {
    messageData: {},
    emailAddresses: new Set()
  }

  const gmail = google.gmail({ version: 'v1', auth })

  // Get the messages response object
  const msgsResp = await gmail.users.messages.list({ userId: 'me' })

  // Get the messages property from response
  const messages = msgsResp.data.messages

  // Return early if there are no messages
  if (!messages || messages.length === 0) {
    console.log(`Sorry, no messages were found.`)
    return
  }

  // Otherwise, loop through each message id and display message
  console.log('Messages:')

  // while (messages.get)

  const latestMsg = await gmail.users.messages.get({ userId: 'me', id: messages[0].id })

  for (let i = 0; i < messages.length; i++) {

    const msgId = messages[i]

    const msg = await gmail.users.messages.get({ userId: 'me', id: msgId.id })
    const data = msg.data
    const emailId = data.id
    const snippet = data.snippet
    const labels = data.labelIds

    const payload = data.payload
    const sender = payload.headers.find(header => header.name === "From")

    // If payload has mimetype text or html, treat as text
    let payloadData = payload.parts.filter(part => part.mimeType === 'text/html')
    let pldLen = payloadData.length
    payloadData.forEach(part => {
      let decoded = Buffer.from( part.body.data, 'base64' ).toString('utf-8')
      console.log (decoded)
    })
    // payloadData = Buffer.isBuffer(payloadData) ? 'Data is a buffer type' :  'Date is NOT a buffer'
    

    // Build dict for this email message

    msgObj = {
      labels: labels,
      payload: payloadData 
    }

    dict.messageData[emailId] = msgObj

    // While testing only print 4 results
    if (i === 1) { break }

  }

  // return our dictionary
  // return dict

}



authorize()
  // .then(listLabels)
  .then(buildMessagesDict).then(res => console.log(JSON.stringify(res,null,3)))
  .then(console.log(separator_bar))
  .catch(console.error)