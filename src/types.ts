export type UUID = string;
export type ID = string;
type VotesMapElement = [ID, number];


export interface Option {
  id: ID,
  value: string
}


export interface Poll {
  uuid: UUID;
  title: string;
  options: Option[];
  votes?: VotesMapElement[];
}
