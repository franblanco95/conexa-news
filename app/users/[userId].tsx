import { IconSymbol } from '@/components/ui/IconSymbol';
import { useGetUserDetail } from '@/src/hooks/useGetUsers';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function UserDetailScreen() {
  const { userId } = useLocalSearchParams();
  const { data: user, isLoading, isError } = useGetUserDetail(userId as string);

  const { t } = useTranslation();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('users.errorLoading')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://randomuser.me/api/portraits/men/${user.id}.jpg`,
          }}
          style={styles.avatar}
          contentFit="cover"
        />
        <Text
          style={styles.userName}
        >{`${user.firstname} ${user.lastname}`}</Text>
        {user.company && user.company.name && (
          <Text style={styles.userCompany}>{user.company.name}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('users.contactInfo')}</Text>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <IconSymbol name="envelope.fill" size={20} color="#007AFF" />
          </View>
          <View>
            <Text style={styles.infoLabel}>{t('users.email')}</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <IconSymbol name="phone.fill" size={20} color="#34C759" />
          </View>
          <View>
            <Text style={styles.infoLabel}>{t('users.phone')}</Text>
            <Text style={styles.infoValue}>{user.phone || '---'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <IconSymbol name="globe" size={20} color="#5856D6" />
          </View>
          <View>
            <Text style={styles.infoLabel}>{t('users.website')}</Text>
            <Text style={styles.infoValue}>{user.website || '---'}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <IconSymbol name="location.fill" size={20} color="#007AFF" />
          </View>
          <View>
            <Text style={styles.infoLabel}>{t('users.address')}</Text>
            <Text style={styles.infoValue}>
              {`${user.address.street}, ${user.address.suite}` || '---'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  userCompany: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  addressContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
});
