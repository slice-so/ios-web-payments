import { PUBLIC_ENV } from 'app/env/public-env'
import { SERVER_ENV } from 'app/env/server-env'

const appID = `${SERVER_ENV.APPLE_TEAM_ID}.${PUBLIC_ENV.BUNDLE_IDENTIFIER}`

export async function GET(request: Request) {
  return Response.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appID: appID,
            paths: ['/checkout_redirect*'],
          },
        ],
      },
      webcredentials: {
        apps: [appID],
      },
      activitycontinuation: {
        apps: [appID],
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    }
  )
}
