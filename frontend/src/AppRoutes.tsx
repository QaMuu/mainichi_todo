import { Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai'
import { UIProvider } from "@yamada-ui/react";

import {TodoListView} from "./components/TodoListView.tsx";
import {AddNewTodo} from "./components/AddNewTodo.tsx";

function AppRoutes() {

  return (
    <UIProvider>
      <Provider>
        <Routes>
          <Route path="/" element={<TodoListView />} />
          <Route path="/AddNewTodo" element={<AddNewTodo />} />
        </Routes>
      </Provider>
    </UIProvider>
  )
}

export default AppRoutes
