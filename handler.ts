import { APIGatewayProxyHandler } from 'aws-lambda'
import { getEventHandler } from 'eventHandlers'
import { UnsupportedEventException } from 'exceptions'
import { isValidGithubPayload } from 'validations'

export const eventHook: APIGatewayProxyHandler = async (event) => {
  const payload = JSON.parse(event.body)
  if (!isValidGithubPayload(payload)) {
    return { statusCode: 400, body: 'invalid payload' }
  }

  try {
    const handler = getEventHandler(payload)
    await handler(payload)
  } catch (e) {
    if (e instanceof UnsupportedEventException) {
      return { statusCode: 400, body: 'unsupported event' }
    }
    console.log({ payload, message: e.message })
    return { statusCode: 500, body: e.message }
  }

  return {
    statusCode: 200,
    body: 'success',
  }
}
