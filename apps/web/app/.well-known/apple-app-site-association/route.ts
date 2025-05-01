import { PUBLIC_ENV } from 'app/env/public-env'

export async function GET(request: Request) {
  return Response.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appIDs: [PUBLIC_ENV.BUNDLE_IDENTIFIER],
            components: [
              {
                '/': '/checkout_redirect*',
                comment:
                  'Matches any URL whose path starts with /checkout_redirect',
              },
            ],
          },
        ],
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
