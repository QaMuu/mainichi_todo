import {useAtomValue} from "jotai";

import {ITodo_list} from "../globals";
import {atomAryTodoLists} from "../jotai/atomMainichiTodo";

import {TodoListsItem} from "./TodoListsItem";

export function TodoLists() {
  const aryTodoLists:ITodo_list[] = useAtomValue(atomAryTodoLists);
  return (
    <>
      <h2>直近リスト</h2>
      {aryTodoLists.map((_todo_list:ITodo_list) => (
        <TodoListsItem key={_todo_list.id} todo_item={_todo_list} />
      ))}
    </>
  )
}