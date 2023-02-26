import axios from 'axios';

export function GetBotAPISetting() {
  return axios.get(`/v3/api/bot-api/setting`);
}

export function SaveBotAPISetting(data: any) {
  return axios.put('/v3/api/bot-api/setting', data);
}
