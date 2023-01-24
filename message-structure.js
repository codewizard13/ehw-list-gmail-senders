// Gmail message structure
{
  config: {
    url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/185e5050ade1c783',
    method: 'GET',
    userAgentDirectives: [ [Object] ],
    paramsSerializer: [Function (anonymous)],
    headers: {
      'x-goog-api-client': 'gdcl/6.0.4 gl-node/18.13.0 auth/8.7.0',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'google-api-nodejs-client/6.0.4 (gzip)',
      Authorization: 'Bearer ya29.a0AVvZVsrFmRYOVhYttMh8lrJTMjWLrJ3ZlkWUcr8BwzRnxN41_n-H8fv7N8iyVnvagvm3KAQfwhP0xKnPbDDD7IIBim2y0S8Z-K8NJCvw2f6dELIVSW8-84iw_3X1akGXA-njmw4DoLEwjASp2XiY9c2_sXIwMjUaCgYKAYASAQASFQGbdwaIbuLqspwGQ82e0zYUD_yC0Q0166',
      Accept: 'application/json'
    },
    params: {},
    validateStatus: [Function (anonymous)],
    retry: true,
    responseType: 'json'
  },
  data: {
    id: '185e5050ade1c783',
    threadId: '185e49a5051110eb',
    labelIds: [ 'UNREAD', 'IMPORTANT', 'CATEGORY_PERSONAL', 'INBOX' ],
    snippet: 'I&#39;ll be sending you an email later today with all this info :) Stand by You&#39;re on central time, right? Michael Wilhelm From: Eric Hepperle &lt;erichepperle.jobs@gmail.com&gt; Sent: Tuesday,',
    payload: {
      partId: '',
      mimeType: 'multipart/alternative',
      filename: '',
      headers: [Array],
      body: [Object],
      parts: [Array]
    },
    sizeEstimate: 10648,
    historyId: '2306996',
    internalDate: '1674584585000'
  },
  headers: {
    'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
    'cache-control': 'private',
    connection: 'close',
    'content-encoding': 'gzip',
    'content-type': 'application/json; charset=UTF-8',
    date: 'Tue, 24 Jan 2023 19:29:03 GMT',
    server: 'ESF',
    'transfer-encoding': 'chunked',
    vary: 'Origin, X-Origin, Referer',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '0'
  },
  status: 200,
  statusText: 'OK',
  request: {
    responseURL: 'https://gmail.googleapis.com/gmail/v1/users/me/messages/185e5050ade1c783'
  }
}