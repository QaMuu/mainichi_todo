import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";

import {Box, Heading, Center, Button, Flex} from "@yamada-ui/react"
// import {Input, InputGroup, InputLeftAddon, VStack, Select} from "@yamada-ui/react"
import { useNavigate, useParams } from "react-router-dom"

import {ICategoryType, IRepeatType, ITodo_Type, ITodo_list} from "../globals";
import {atomAryCategoryTypes, atomAryRepeatTypes, atomAryTodoTypes, atomAryTodoLists} from "../jotai/atomMainichiTodo";
import {dateFormatterToDate, getStartDate} from "../utilitys/DateController.ts";

export function ToDoDoneCheck() {
  const aryCategoryTypes:ICategoryType[] = useAtomValue(atomAryCategoryTypes);
  const aryRepeatTypes:IRepeatType[] = useAtomValue(atomAryRepeatTypes);
  const aryTodoTypes:ITodo_Type[] = useAtomValue(atomAryTodoTypes);
  const aryTodoLists:ITodo_list[] = useAtomValue(atomAryTodoLists);

  const todoListId = Number(useParams().todoListID);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoCategoryType, setTodoCategoryType] = useState<string>("");
  // const [todoCategoryTypeId, setTodoCategoryTypeId] = useState<number>(0);
  const [todoRepeatType, setTodoRepeatType] = useState<string>("");
  // const [todoRepeatColor, setTodoRepeatColor] = useState<string>("");
  const [todoDate, setTodoDate] = useState<string>("");
  const [nextTodoDate, setNextTodoDate] = useState<string>("");
  // const aryRepeatTypeColors:string[] = ['red.500', 'orange.300', 'emerald.500', 'sky.500', 'purple.500'];

  useEffect(() => {
    const todoList = aryTodoLists.find((_todo_list:ITodo_list) => _todo_list.id === todoListId) as ITodo_list;
    const todoType:ITodo_Type = aryTodoTypes.find((_todo_type:ITodo_Type) => _todo_type.id === todoListId) as ITodo_Type;

    const title = todoType.title;
    setTodoTitle(title);

    const categoryType:ICategoryType = aryCategoryTypes[todoType.category_type_id - 1];
    setTodoCategoryType(categoryType.category_type_name);
    // setTodoCategoryTypeId(todoType.category_type_id)

    const _repeatType:IRepeatType = aryRepeatTypes[todoType.repeat_type_id - 1];
    setTodoRepeatType(_repeatType.repeat_type_name);
    // const _repeatColor = aryRepeatTypeColors[todoType.repeat_type_id - 1];
    // setTodoRepeatColor(_repeatColor);

    const _date = dateFormatterToDate(todoList.todo_date.toString());
    setTodoDate(_date);

    let _beforeDateString:string = todoList.todo_date.toString();
    let _beforeDate:Date = new Date(_beforeDateString);
    const _nextMonthDate:number = todoType.target_day

    const _nextDate = getStartDate(_beforeDate, todoType.repeat_type_id, _nextMonthDate);
    setNextTodoDate(dateFormatterToDate(_nextDate.toString()));
  }, []);

  const pageNavigator = useNavigate();
  const handlerClickReturnLists = () => {
    pageNavigator("/");
  }

  return (
    <>
      <Center>
        <Heading as="h1" size="2xl" isTruncated>毎日ToDo：完了確認</Heading>
      </Center>
      <Box p="md" m="md" rounded="md" borderStyle="1px">
        <p>{todoListId}</p>
        <p>{todoTitle}</p>
        <p>{todoCategoryType}</p>
        <p>{todoRepeatType}</p>
        <p>{todoDate}</p>
        <p>次の実施日は{nextTodoDate}</p>
        {/* 画面下部ボタン */}
        <Flex w={"full"} gap={"md"}>
          <Button w={'full'} colorScheme="blue" variant={"outline"} onClick={() => { handlerClickReturnLists() }}>リストに戻る</Button>
          <Button w={'full'} colorScheme="blue">完了する！</Button>
        </Flex>

      </Box>
    </>
  )
}
