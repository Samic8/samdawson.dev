const cookie = require("cookie")
const ua = require("universal-analytics")
const id = "UA-93793174-3"

exports.handler = (event, context, callback) => {
  const type = event.queryStringParameters.type
  const page = event.queryStringParameters.page

  const { _ga: clientId } = cookie.parse(event.cookie) || {}
  const visitor = clientId ? ua(id, clientId) : ua(id)

  // Logging for netlify dev console
  console.log(`clientId: ${clientId}`)

  visitor.event("Quick Feedback", type, page).send(err => {
    if (err) {
      return callback(null, {
        statusCode: 500,
        body: "Failed",
      })
    }

    callback(null, {
      statusCode: 200,
      body: "Event Tracked",
    })
  })
}
