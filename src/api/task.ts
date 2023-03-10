import axios from 'axios';

export interface TaskNotice {
  key: string;
  value: string;
}

export interface ProjectList {
  project_type: string;
  project_price: number;
  project_remarks: string;
  project_tips: string;
}

export interface ProjectSend {
  task_type: string;
  variable: string;
  number: number;
  remarks: string;
}

export interface ProjectDataList {
  ID: number;
  project_type: string;
  project_price: number;
  project_agent_price: number;
  project_remarks: string;
  project_agent_state: boolean;
  project_state: boolean;
}

export function getTaskNotice() {
  return axios.get<TaskNotice>('/v2/api/get/setting?key=task_notice');
}

export function getProjectList() {
  return axios.get<ProjectList[]>('/v2/api/user/task/list');
}

export function sendProject(data: ProjectSend) {
  return axios.post('/v2/api/user/vote/start', data);
}

export function getProjectDataList(pageNum: number) {
  return axios.get<ProjectDataList>(
    `/v3/api/project/division/data?page=${pageNum}`
  );
}

export function projectDataSearch(data: any) {
  return axios.get(`/v3/api/project/search?type=${data.fc}&s=${data.data}`);
}

export function addProject(data: any) {
  return axios.post('/v3/api/project/add', data);
}

export function updateProject(data: any) {
  return axios.put('/v3/api/project/update', data);
}

export function deleteProject(ID: any) {
  return axios.delete('/v3/api/project/delete', { data: ID });
}
