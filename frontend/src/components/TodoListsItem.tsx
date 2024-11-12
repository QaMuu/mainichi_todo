import {useEffect, useState} from "react";

import {useAtomValue} from "jotai";
import { Box, Center, Flex, Spacer, Text } from "@yamada-ui/react"

import {ICategoryType, IRepeatType, ITodo_Type, ITodo_list} from "../globals";
import {atomAryCategoryTypes, atomAryRepeatTypes, atomAryTodoTypes} from "../jotai/atomMainichiTodo";
import {dateFormatterToDate} from "../utilitys/DateController.ts";
import {ImageButtonDone} from "./ImageButtonDone.tsx";

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
  const [todoCategoryTypeId, setTodoCategoryTypeId] = useState<number>(0);
  const [todoRepeatType, setTodoRepeatType] = useState<string>("");
  const [todoRepeatColor, setTodoRepeatColor] = useState<string>("");
  const [todoDate, setTodoDate] = useState<string>("");

  const aryRepeatTypeColors:string[] = ['red.500', 'orange.300', 'emerald.500', 'sky.500', 'purple.500'];

  useEffect(() => {
    const _todoType:ITodo_Type = aryTodoTypes[todoItem.todo_type_id - 1];

    const _title = _todoType.title;
    setTodoTitle(_title);

    const _categoryType:ICategoryType = aryCategoryTypes[_todoType.category_type_id - 1];
    setTodoCategoryType(_categoryType.category_type_name);
    setTodoCategoryTypeId(_todoType.category_type_id)

    const _repeatType:IRepeatType = aryRepeatTypes[_todoType.repeat_type_id - 1];
    setTodoRepeatType(_repeatType.repeat_type_name);
    const _repeatColor = aryRepeatTypeColors[_todoType.repeat_type_id - 1];
    setTodoRepeatColor(_repeatColor);

    const _date = dateFormatterToDate(todoItem.todo_date.toString());
    setTodoDate(_date);
  }, []);

  return (
    <Box bg="white" p="2" rounded="md" marginBottom="2">
      <Center fontSize="xs" fontWeight="bold" color={todoRepeatColor} borderColor={todoRepeatColor} borderWidth="1px" rounded="md" marginBottom="1">
        {todoRepeatType}
      </Center>
      <Flex w={"full"} gap={"md"}>
        <Box>
          <Text>{todoTitle}</Text>
          <Text fontSize={"smaller"}>実施予定日 : {todoDate}</Text>
        </Box>
        <Spacer />
        <Box>
          <Center as={"button"} rounded="md" w={"100px"} h={"full"} bg={"blackAlpha.600"} color={"white"} >
            <ImageButtonDone category_type_id={todoCategoryTypeId} category_type_name={todoCategoryType} />
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}