import React, {useEffect, useState} from "react";
import {useAtomValue} from "jotai";

import {Box, Heading, Center, Button, Flex} from "@yamada-ui/react"
import {Input, InputGroup, InputLeftAddon, VStack, Select} from "@yamada-ui/react"
import { useNavigate } from "react-router-dom"

import {ICategoryType, IRepeatType, ITodo_Type, ITodo_list} from "../globals";
import {atomAryCategoryTypes, atomAryRepeatTypes, atomAryTodoTypes, atomAryTodoLists} from "../jotai/atomMainichiTodo";
import {getStartDate} from "../utilitys/DateController.ts";

export function AddNewTodo() {
  const aryRepeatTypes:IRepeatType[] = useAtomValue(atomAryRepeatTypes);
  const aryCategoryTypes:ICategoryType[] = useAtomValue(atomAryCategoryTypes);
  const aryTodoTypes:ITodo_Type[] = useAtomValue(atomAryTodoTypes);
  const aryTodoLists:ITodo_list[] = useAtomValue(atomAryTodoLists);
  const [arySelectItemRepeat, setArySelectItemRepeat] = useState([{}]);
  const [arySelectItemCategory, setArySelectItemCategory] = useState([{}]);
  const [arySelectItemWeekDay, setArySelectItemWeekDay] = useState([{}]);
  const [isDrawSelectWeekDay, setIsDrawSelectWeekDay] = useState<boolean>(false);
  const [isDrawSelectDay, setIsDrawSelectDay] = useState<boolean>(false);

  useEffect(() => {
    const _arySelectItemRepeat = aryRepeatTypes.map((item:IRepeatType) => {
      return {value: item.id, label: item.repeat_type_name};
    });
    setArySelectItemRepeat(_arySelectItemRepeat);

    const _arySelectItemCategory = aryCategoryTypes.map((item:ICategoryType) => {
      return {value: item.id, label: item.category_type_name};
    });
    setArySelectItemCategory(_arySelectItemCategory);

    const _arySelectItemWeekDay = [
      {value: "0", label: "日曜日"},
      {value: "1", label: "月曜日"},
      {value: "2", label: "火曜日"},
      {value: "3", label: "水曜日"},
      {value: "4", label: "木曜日"},
      {value: "5", label: "金曜日"},
      {value: "6", label: "土曜日"},
    ]
    setArySelectItemWeekDay(_arySelectItemWeekDay);

  }, []);

  const [sendTodoTitle, setSendTodoTitle] = useState<string>("");
  const [sendTodoRepeatType, setSendTodoRepeatType] = useState<string>("1");
  const [sendTodoCategoryType, setSendTodoCategoryType] = useState<string>("1");
  const [sendTodoWeekDay, setSendTodoWeekDay] = useState<string>("0");
  const [SendTodoDay, setSendTodoDay] = useState<string>("1");

  useEffect(() => {
    switch (sendTodoRepeatType.toString()) {
      case "1":
        setIsDrawSelectWeekDay(false);
        setIsDrawSelectDay(false);
        break;
      case "2":
        setIsDrawSelectWeekDay(true);
        setIsDrawSelectDay(false);
        break;
      case "3":
        setIsDrawSelectWeekDay(true);
        setIsDrawSelectDay(false);
        break;
      case "4":
        setIsDrawSelectWeekDay(true);
        setIsDrawSelectDay(false);
        break;
      case "5":
        setIsDrawSelectWeekDay(false);
        setIsDrawSelectDay(true);
        break;
    }
  }, [sendTodoRepeatType]);

  function handlerChangeTodoTitle(event:React.ChangeEvent<HTMLInputElement>) {
    setSendTodoTitle(event.target.value);
  }

  function handlerChangeTodoDay(event:React.ChangeEvent<HTMLInputElement>) {
    setSendTodoDay(event.target.value);
  }

  const pageNavigator = useNavigate();
  const handlerClickReturnLists = () => {
    pageNavigator("/");
  }

  async function handlerClickAddNewTodo() {
    const _addNewTodoTitle:string = sendTodoTitle;
    const _addNewTodoRepeatType:number = Number(sendTodoRepeatType);
    const _addNewTodoCategoryType:number = Number(sendTodoCategoryType);
    let _addNewTodoWeekDay:number = Number(sendTodoWeekDay);
    let _addNewTodoDay:number = Number(SendTodoDay);
    let _addNewTodoDateStart:Date = new Date();

    switch(_addNewTodoRepeatType) {
      case 1:
        _addNewTodoWeekDay = 0;
        _addNewTodoDay = 1;
        _addNewTodoDateStart = getStartDate(_addNewTodoDateStart, _addNewTodoRepeatType);
        break;
      case 2:
      case 3:
      case 4:
        _addNewTodoDateStart = getSettingDate(_addNewTodoWeekDay);
        _addNewTodoDateStart = getStartDate(_addNewTodoDateStart, _addNewTodoRepeatType);
        break;
      case 5:
        _addNewTodoWeekDay = 0;
        _addNewTodoDateStart = getStartDate(_addNewTodoDateStart, _addNewTodoRepeatType, _addNewTodoDay);
        break
    }

    const _addNewTodoTypeID:number = aryTodoTypes.length + 2;
    const _addNewToDoType:ITodo_Type ={
      id: _addNewTodoTypeID,
      title: _addNewTodoTitle,
      repeat_type_id: _addNewTodoRepeatType,
      category_type_id: _addNewTodoCategoryType,
      use_time: false,
      date_start: _addNewTodoDateStart,
      target_weekday: _addNewTodoWeekDay,
      target_day: _addNewTodoDay,
      target_time: _addNewTodoDateStart
    }

    const _addNewTodoListID:number = aryTodoLists.length + 2;
    const _addNewTodoList:ITodo_list = {
      id: _addNewTodoListID,
      todo_type_id: _addNewTodoTypeID,
      todo_date: _addNewTodoDateStart,
      check_done: false
    }

    await fetch("http://localhost:3000/api/add/todo_type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(_addNewToDoType)
    })

    await fetch("http://localhost:3000/api/add/todo_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(_addNewTodoList)
    })

    pageNavigator("/");
  }

  const getSettingDate = (targetWD:number) => {
    let currentDate = new Date();

    let date_1 = new Date();
    let date_2 = new Date();
    let date_3 = new Date();
    let date_4 = new Date();
    let date_5 = new Date();
    let date_6 = new Date();
    let date_7 = new Date();

    date_2.setDate(date_2.getDate() + 1);
    date_3.setDate(date_3.getDate() + 2);
    date_4.setDate(date_4.getDate() + 3);
    date_5.setDate(date_5.getDate() + 4);
    date_6.setDate(date_6.getDate() + 5);
    date_7.setDate(date_7.getDate() + 6);

    const aryDate = [date_1, date_2, date_3, date_4, date_5, date_6, date_7];
    aryDate.map((date:Date) => {
      if(date.getDay() !== currentDate.getDay()) {
        date.setDate(date.getDate() - 7);
      }
    })
    aryDate.sort((a:Date, b:Date) => {
      if(a.getDay() < b.getDay()) return -1;
      if(a.getDay() > b.getDay()) return 1;
      return 0;
    })
    return aryDate[targetWD];
  }

  return (
    <>
      <Center>
        <Heading as="h1" size="2xl" isTruncated>毎日ToDo：新規登録</Heading>
      </Center>
      <Box p="md" m="md" rounded="md" borderStyle="1px">

        <VStack>

          {/* TODOタイトル入力 */}
          <InputGroup mb={"4"}>
            <InputLeftAddon>タイトル</InputLeftAddon>
            <Input placeholder="燃えるゴミを出す"
                   onChange={(evt) => {handlerChangeTodoTitle(evt)}} />
          </InputGroup>

          {/* カテゴリー選択 */}
          <InputGroup mb={"4"}>
            <InputLeftAddon>カテゴリー</InputLeftAddon>
            <Select placeholder="カテゴリーを選ぶ" items={arySelectItemCategory}
                    onChange={(value) => {setSendTodoCategoryType(value)}} />
          </InputGroup>

          {/* リピート周期選択 */}
          <InputGroup mb={"4"}>
            <InputLeftAddon>リピート周期</InputLeftAddon>
            <Select placeholder="リピート周期を選ぶ" items={arySelectItemRepeat}
                    onChange={(value) => {setSendTodoRepeatType(value)}}/>
          </InputGroup>

          {/* 対象曜日を選択 */}
          {isDrawSelectWeekDay ? (
            <InputGroup mb={"4"}>
              <InputLeftAddon>対象曜日</InputLeftAddon>
              <Select placeholder="対象曜日を選ぶ" items={arySelectItemWeekDay}
                      onChange={(value) => {setSendTodoWeekDay(value)}} />
            </InputGroup>
          ) : null}

          {/* 対象日を選択 */}
          {isDrawSelectDay ? (
            <InputGroup mb={"4"}>
              <InputLeftAddon>対象日</InputLeftAddon>
              <Input placeholder="28"
                     onChange={(evt) => {handlerChangeTodoDay(evt)}} />
            </InputGroup>
          ) : null}

        </VStack>

        {/* 画面下部ボタン */}
        <Flex w={"full"} gap={"md"}>
          <Button w={'full'} colorScheme="blue" variant={"outline"} onClick={() => { handlerClickReturnLists() }}>リストに戻る</Button>
          <Button w={'full'} colorScheme="blue" onClick={() => {handlerClickAddNewTodo()}}>登録</Button>
        </Flex>

      </Box>
    </>
  )
}
