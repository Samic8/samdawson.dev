const ua = require("universal-analytics")
const visitor = ua("UA-93793174-3")

exports.handler = (event, context, callback) => {
  const type = event.queryStringParameters.type
  const page = event.queryStringParameters.type

  visitor.event("Test Quick Feedback", type, page).send(err => {
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
