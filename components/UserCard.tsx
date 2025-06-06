import { User } from '@/src/services/requests/usersService';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface Props {
  user: User;
  onPress?: () => void;
}

export default function UserCard({ user, onPress }: Props) {
  return (
    <Link href={`/users/${user.id}`} asChild>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
          source={{
            uri: `https://randomuser.me/api/portraits/men/${user.id}.jpg`,
          }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.content}>
          <Text style={styles.name}>
            {`${user.firstname} ${user.lastname}`}
          </Text>

          <View style={styles.infoRow}>
            <IconSymbol
              name="envelope.fill"
              size={14}
              color="#999"
              style={styles.icon}
            />
            <Text style={styles.info}>{user.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <IconSymbol
              name="phone.fill"
              size={14}
              color="#999"
              style={styles.icon}
            />
            <Text style={styles.info}>{user.phone || '---'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E1E1E1',
  },
  content: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
});
