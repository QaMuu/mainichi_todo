import {useEffect, useState} from "react";

import {useAtomValue} from "jotai";

import {ICategoryType, IRepeatType, ITodo_Type, ITodo_list} from "../globals";
import {atomAryCategoryTypes, atomAryRepeatTypes, atomAryTodoTypes} from "../jotai/atomMainichiTodo";

interface props {
  todo_item:ITodo_list;
}

export function TodoListsItem(props:props) {
  const aryCategoryTypes:ICategoryType[] = useAtomValue(atomAryCategoryTypes);
  const aryRepeatTypes:IRepeatType[] = useAtomValue(atomAryRepeatTypes);
  const aryTodoTypes:ITodo_Type[] = useAtomValue(atomAryTodoTypes);

  const todoItem:ITodo_list = props.todo_item;
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoCategoryType, setTodoCategoryType] = useState<string>("");
  const [todoRepeatType, setTodoRepeatType] = useState<string>("");
  const [todoDate, setTodoDate] = useState<string>("");
  const [todoDone, setTodoDone] = useState<boolean>(false);

  useEffect(() => {
    const _todoType:ITodo_Type = aryTodoTypes[todoItem.todo_type_id - 1];
    console.log(_todoType.title);

    const _title = _todoType.title;
    setTodoTitle(_title);

    const _categoryType:ICategoryType = aryCategoryTypes[_todoType.category_type_id - 1];
    setTodoCategoryType(_categoryType.category_type_name);

    const _repeatType:IRepeatType = aryRepeatTypes[_todoType.repeat_type_id - 1];
    setTodoRepeatType(_repeatType.repeat_type_name);

    const _date = todoItem.todo_date.toString();
    setTodoDate(_date);

    const _done = todoItem.check_done;
    setTodoDone(_done);
  }, []);

  return (
    <div>
      <p>{todoTitle}</p>
      <p>{todoCategoryType}</p>
      <p>{todoRepeatType}</p>
      <p>{todoDate}</p>
      <p>{todoDone}</p>
    </div>
  );
}