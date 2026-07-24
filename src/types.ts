export type UUID = string;
export type ID = string;
export type Role = 'student' | 'teacher' | 'admin';
export type GradeValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface Option {
  id: ID,
  value: string
}

export interface Poll {
  id: UUID;
  title: string;
  options: Option[];
  votes?: Map<ID, number>;
}
