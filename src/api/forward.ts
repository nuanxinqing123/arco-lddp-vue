import axios from 'axios';

export function getForwardSimple() {
  return axios.get('/v3/api/order/forward/simple');
}
export function getForwardDataList(pageNum: number) {
  return axios.get(`/v3/api/order/forward/division/data?page=${pageNum}`);
}

export function forwardDataSearch(data: any) {
  return axios.get(
    `/v3/api/order/forward/search?type=${data.fc}&search=${data.data}`
  );
}

export function addForward(data: any) {
  return axios.post('/v3/api/order/forward/add', data);
}

export function updateForward(data: any) {
  return axios.put('/v3/api/order/forward/update', data);
}

export function deleteForward(ID: any) {
  return axios.delete(`/v3/api/order/forward/delete`, { data: ID });
}

// API测试
export function getForwardTest(data: any) {
  return axios.post('/v3/api/order/forward/api/test', data);
}
