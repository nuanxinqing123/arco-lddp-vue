import axios from 'axios';

export function getWenSettings() {
  return axios.get('/v3/api/set/settings');
}
export function sendWenSettings(data: any) {
  return axios.put('/v3/api/set/settings', data);
}
