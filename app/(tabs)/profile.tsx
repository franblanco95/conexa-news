import { IconSymbol } from '@/components/ui/IconSymbol';
import { LANGUAGES, useLanguageStore } from '@/src/store/languageStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { language, changeLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const router = useRouter();

  const handleLanguageChange = async () => {
    const newLanguage = language === LANGUAGES.ES ? LANGUAGES.EN : LANGUAGES.ES;
    await changeLanguage(newLanguage);
  };
  const insets = useSafeAreaInsets();
  const navigateToFavorites = () => {
    router.push('/favorites' as any);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <Text style={styles.title}>{t('profile.title')}</Text>
      </LinearGradient>
      <View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.preferences')}</Text>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceIconContainer}>
              <IconSymbol name="globe" size={20} color="#64D2FF" />
            </View>
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceTitle}>
                {t('profile.language')}
              </Text>
              <Text style={styles.preferenceValue}>
                {t(`profile.languages.${language}`)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLanguageChange}
              style={styles.changeButton}
            >
              <Text style={styles.changeButtonText}>
                {t('profile.changeLanguage')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.menu')}</Text>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={navigateToFavorites}
          >
            <View style={styles.menuIconContainer}>
              <IconSymbol name="star.fill" size={20} color="#FFC107" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{t('profile.favorites')}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#8E8E93',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  preferenceIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  preferenceTextContainer: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    color: '#333',
  },
  preferenceValue: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  changeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#FFC10720',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
