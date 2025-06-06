import { News } from '@/src/services/requests/newsService';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';

interface Props {
  news: News;
  onPress?: () => void;
}

export default function NewsCard({ news, onPress }: Props) {
  const { t } = useTranslation();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  // Formateamos el título para que no sea tan largo
  const title =
    news.title.length > 50 ? `${news.title.substring(0, 50)}...` : news.title;

  const handleFavoritePress = async (e: any) => {
    e.preventDefault(); // Evitar la navegación
    await toggleFavorite(news);
  };

  return (
    <Link href={`/news/${news.id}`} asChild>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
          source={{
            uri:
              news.image || `https://picsum.photos/200/150?random=${news.id}`,
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={2} style={styles.body}>
            {news.content}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.category}>
              {news.category || t('news.general')}
            </Text>
            <Text style={styles.date}>{news.publishedAt}</Text>
          </View>
          <TouchableOpacity
            testID="favorite-button"
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
          >
            <IconSymbol
              name={isFavorite(news.id) ? 'star.fill' : 'star'}
              size={20}
              color={isFavorite(news.id) ? '#FFC107' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
    position: 'relative',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    paddingRight: 30, // Espacio para el botón de favorito
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  category: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
    backgroundColor: '#E1F5FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
});
