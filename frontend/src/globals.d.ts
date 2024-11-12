export interface ICategoryType {
  id: number;
  category_type_name: string;
}

export interface IRepeatType {
  id: number;
  repeat_type_name: string;
}

export interface ITodo_Type {
  id: number;
  title: string;
  repeat_type_id: number;
  category_type_id: number;
  use_time: boolean;
  date_start: Date;
  target_weekday: number;
  target_day: number;
  target_time: Date;
}

export interface ITodo_list {
  id: number;
  todo_type_id: number;
  todo_date: Date;
  check_done: boolean;
}