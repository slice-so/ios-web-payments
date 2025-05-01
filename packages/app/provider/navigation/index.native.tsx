import { NavigationContainer } from '@react-navigation/native'
import { PUBLIC_ENV } from 'app/env/public-env'
import * as Linking from 'expo-linking'
import { useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [
            Linking.createURL('/'),
            `https://${PUBLIC_ENV.APP_URL}`,
            `http://${PUBLIC_ENV.APP_URL}`,
          ],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              'checkout-success': 'checkout-success',
              'checkout-cancel': 'checkout-cancel',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
