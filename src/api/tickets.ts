import axios from 'axios';

export interface TicketsList {
  ID: number;
  tickets_key: string;
  tickets_key_points: number;
  tickets_key_remarks: string;
  tickets_key_state: boolean;
  CreatedAt: string;
}

export function getTicketsList(pageNum: number) {
  return axios.get<TicketsList>(
    `/v3/api/tickets/division/data?page=${pageNum}`
  );
}

export function addTickets(data: any) {
  return axios.post('/v3/api/tickets/add', data);
}

export function ticketsDataSearch(data: any) {
  return axios.get(
    `/v3/api/tickets/search?type=${data.fc}&state=${data.state}&s=${data.data}`
  );
}

export function deleteTickets(ID: any) {
  return axios.delete('/v3/api/tickets/delete', { data: ID });
}

export function downloadTickets() {
  // @ts-ignore
  return axios.get('/v3/api/tickets/data/download', { isDownload: true });
}
