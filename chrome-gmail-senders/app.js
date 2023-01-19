fetch("https://www.googleapis.com/gmail/v1/users/me/messages", {
  headers: {
    "Authorization": "Bearer " + ACCESS_TOKEN
  }
})
  .then(response => response.json())
  .then(data => {
    // Extract sender information from API response
    const senders = data.messages.map(message => message.payload.headers.find(header => header.name === "From").value);
    // Build table using the senders information
    buildTable(senders);
  });