import {useEffect, useState} from "react";
import {useSetAtom} from "jotai";
import { Heading, Center } from "@yamada-ui/react"

import {ICategoryType, IRepeatType, ITodo_Type, ITodo_list} from "../globals";
import {atomAryCategoryTypes, atomAryRepeatTypes, atomAryTodoTypes, atomAryTodoLists} from "../jotai/atomMainichiTodo";

import {TodoLists} from "./TodoLists.tsx";

export function TodoListView() {
  const setAtomAryCategoryTypes = useSetAtom(atomAryCategoryTypes);
  const setAtomAryRepeatTypes = useSetAtom(atomAryRepeatTypes);
  const setAtomAryTodoTypes = useSetAtom(atomAryTodoTypes);
  const setAtomAryTodoLists = useSetAtom(atomAryTodoLists);

  const [isDrawTodoLists, setIsDrawTodoLists] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      // Fetch category types
      const _resultGetCategoryTypes = await fetch("http://localhost:3000/api/get/category_types");
      const _aryCategoryTypes = await _resultGetCategoryTypes.json();
      setAtomAryCategoryTypes(_aryCategoryTypes as ICategoryType[]);

      // Fetch repeat types
      const _resultGetRepeatTypes = await fetch("http://localhost:3000/api/get/repeat_types");
      const _aryRepeatTypes = await _resultGetRepeatTypes.json();
      setAtomAryRepeatTypes(_aryRepeatTypes as IRepeatType[]);

      // Fetch todo types
      const _resultGetTodoTypes = await fetch("http://localhost:3000/api/get/todo_types");
      const _aryTodoTypes = await _resultGetTodoTypes.json();
      setAtomAryTodoTypes(_aryTodoTypes as ITodo_Type[]);

      // Fetch todo lists
      const _resultGetTodoLists = await fetch("http://localhost:3000/api/get/todo_lists");
      const _aryTodoLists = await _resultGetTodoLists.json();
      setAtomAryTodoLists(_aryTodoLists as ITodo_list[]);

      if(_aryTodoLists.length > 0) {
        setIsDrawTodoLists(true);
      } else {
        setIsDrawTodoLists(false);
      }

    })();
  }, []);

  return (
    <>
      <Center>
        <Heading as="h1" size="2xl" isTruncated>毎日ToDo</Heading>
      </Center>

      {isDrawTodoLists ? (
        <TodoLists />
        ):(
        <p>リストなし</p>
        )
      }
    </>
  )
}