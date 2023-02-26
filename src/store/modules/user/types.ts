export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  user_id?: string;
  email?: string;
  points?: number;
  to_day_order?: number;
  yes_day_order?: number;
  seven_days_order?: any;
  seven_days_date?: any;
  role: RoleType;
}
