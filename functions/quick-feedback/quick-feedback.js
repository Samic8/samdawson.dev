const ua = require("universal-analytics")
const id = "UA-93793174-3"

exports.handler = (event, context, callback) => {
  const clientId = event.queryStringParameters.clientId
  const type = event.queryStringParameters.type
  const page = event.queryStringParameters.page

  const visitor = clientId ? ua(id, clientId) : ua(id)

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
