import moment from 'moment';
import { News } from '../requests/newsService';

export const sanitizeNews = (data: any): News => ({
  ...data,
  publishedAt: moment(data.publishedAt, 'DD/MM/YYYY HH:mm:ss', true).format(
    'DD/MM/YYYY'
  ),
});
