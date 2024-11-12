import { useAtomValue } from "jotai";
import { Heading, Box, Center } from "@yamada-ui/react"
import { useNavigate } from "react-router-dom"

import {ITodo_list} from "../globals";
import {atomAryTodoLists} from "../jotai/atomMainichiTodo";

import {TodoListsItem} from "./TodoListsItem";

export function TodoLists() {
  const pageNavigator = useNavigate();
  const aryTodoLists:ITodo_list[] = useAtomValue(atomAryTodoLists);

  const handlerClickAddNewTodo = () => {
    pageNavigator("/AddNewTodo");
  }

  return (
    <Box p="md" m="md" rounded="md" bg="gray.50" borderStyle="1px">

      <Heading as="h2" size="1xl" isTruncated>直近リスト</Heading>

      <Center as={"button"} w={"full"} h={"4em"} bg={'white'}
              marginBottom={"2"} rounded={"md"} color={"gray.300"}
              onClick={() =>{ handlerClickAddNewTodo() }}> ++ Create New Todo ++
      </Center>

      {aryTodoLists.map((_todo_list:ITodo_list) => (
        <TodoListsItem key={_todo_list.id} todo_item={_todo_list} />
      ))}
    </Box>
  )
}