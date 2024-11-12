import { Routes, Route } from 'react-router-dom';
import {TodoListView} from "./components/TodoListView.tsx";
import { Provider } from 'jotai'
import { UIProvider } from "@yamada-ui/react";

function AppRoutes() {

  return (
    <UIProvider>
      <Provider>
        <Routes>
          <Route path="/" element={<TodoListView />} />
        </Routes>
      </Provider>
    </UIProvider>
  )
}

export default AppRoutes
