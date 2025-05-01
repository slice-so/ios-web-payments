'use client'

import { Text, View, Linking } from 'react-native'
import { PUBLIC_ENV } from 'app/env/public-env'

export function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        gap: 32,
      }}
    >
      <H1>Welcome to Solito Payments.</H1>
      <Text
        style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}
        onPress={async () => {
          const protocol = PUBLIC_ENV.APP_URL.startsWith('localhost')
            ? 'http'
            : 'https'
          const requestUrl = `${protocol}://${PUBLIC_ENV.APP_URL}/api/stripe/checkout-session`
          const session: { url: string } = await fetch(requestUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) => res.json())

          if (session && typeof session.url === 'string') {
            Linking.openURL(session.url)
          }
        }}
      >
        Try clicking me to checkout!
      </Text>
    </View>
  )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <Text style={{ fontWeight: '800', fontSize: 24 }}>{children}</Text>
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <Text style={{ textAlign: 'center' }}>{children}</Text>
}
