import {atom, PrimitiveAtom} from 'jotai';
import {ICategoryType, IRepeatType, ITodo_list, ITodo_Type} from "../globals";

export const atomAryCategoryTypes:PrimitiveAtom<ICategoryType[]> = atom<ICategoryType[]>([]);
export const atomAryRepeatTypes:PrimitiveAtom<IRepeatType[]> = atom<IRepeatType[]>([]);
export const atomAryTodoTypes:PrimitiveAtom<ITodo_Type[]> = atom<ITodo_Type[]>([]);
export const atomAryTodoLists:PrimitiveAtom<ITodo_list[]> = atom<ITodo_list[]>([]);