import {useEffect, useState} from "react";
import {useAtomValue} from "jotai";

import {Box, Heading, Center, Button, Flex} from "@yamada-ui/react"
import {Input, InputGroup, InputLeftAddon, VStack, Select} from "@yamada-ui/react"
import { useNavigate } from "react-router-dom"

import {ICategoryType, IRepeatType, ITodo_Type, ITodo_list} from "../globals";
import {atomAryCategoryTypes, atomAryRepeatTypes, atomAryTodoTypes} from "../jotai/atomMainichiTodo";

export function AddNewTodo() {
  const pageNavigator = useNavigate();

  const handlerClickReturnLists = () => {
    pageNavigator("/");
  }

  return (
    <>
      <Center>
        <Heading as="h1" size="2xl" isTruncated>毎日ToDo：新規登録</Heading>
      </Center>
      <Box p="md" m="md" rounded="md" borderStyle="1px">

        <VStack>
          <InputGroup mb={"4"}>
            <InputLeftAddon>タイトル</InputLeftAddon>
            <Input placeholder="燃えるゴミを出す" />
          </InputGroup>
          <Select placeholder="繰り返し周期を選ぶ" mb={"4"} items={selItemRepeat} />
        </VStack>

        {/* 画面下部ボタン */}
        <Flex w={"full"} gap={"md"}>
          <Button w={'full'} colorScheme="blue" variant={"outline"} onClick={() => { handlerClickReturnLists() }}>リストに戻る</Button>
          <Button w={'full'} colorScheme="blue">登録</Button>
        </Flex>

      </Box>
    </>
  )
}
