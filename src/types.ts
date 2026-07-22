export type ID = string;
export type Role = 'student' | 'teacher' | 'admin';
export type GradeValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface RequestDataLogin {
  login: string;
  password: string;
}