import '@testing-library/jest-native/extend-expect';
import React from 'react';

global.jest = jest;
global.describe = describe;
global.it = it;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;

const originalConsoleWarn = console.warn;
console.warn = (message) => {
  if (
    message &&
    message.toString().includes('process.env.EXPO_OS is not defined')
  ) {
    return;
  }
  originalConsoleWarn(message);
};

// Mock Expo Router
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
  useRouter: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: () => true,
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

// Mock imágenes
jest.mock('expo-image', () => 'Image');

// Mock iconos
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
  FontAwesome: 'FontAwesome',
}));

// Mock componentes nativos de React Native
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.TouchableOpacity = ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => children;
  RN.Text = ({ children }: { children: React.ReactNode }) => children;
  RN.View = ({ children }: { children: React.ReactNode }) => children;
  RN.Image = 'Image';

  return RN;
});
