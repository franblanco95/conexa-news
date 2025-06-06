import { DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useInitStores } from '@/src/hooks/useInitStores';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

const queryClient = new QueryClient();

export default function RootLayout() {
  const { t } = useTranslation();

  useInitStores();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: true,
            headerBackTitle:
              Platform.OS === 'ios' ? t('common.goBack') : undefined,
            headerTintColor: '#007AFF',
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="news/[newsId]"
            options={{
              title: t('news.detail'),
            }}
          />

          <Stack.Screen
            name="users/[userId]"
            options={{
              title: t('users.detail'),
            }}
          />

          <Stack.Screen
            name="favorites"
            options={{
              title: t('profile.favorites'),
            }}
          />

          <Stack.Screen
            name="+not-found"
            options={{
              title: t('common.error'),
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
