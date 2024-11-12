import {useAtomValue} from "jotai";
import { Heading, Box } from "@yamada-ui/react"

import {ITodo_list} from "../globals";
import {atomAryTodoLists} from "../jotai/atomMainichiTodo";

import {TodoListsItem} from "./TodoListsItem";

export function TodoLists() {
  const aryTodoLists:ITodo_list[] = useAtomValue(atomAryTodoLists);
  return (
    <Box p="md" m="md" rounded="md" bg="gray.50" borderStyle="1px">
      <Heading as="h2" size="1xl" isTruncated>直近リスト</Heading>
      {aryTodoLists.map((_todo_list:ITodo_list) => (
        <TodoListsItem key={_todo_list.id} todo_item={_todo_list} />
      ))}
    </Box>
  )
}