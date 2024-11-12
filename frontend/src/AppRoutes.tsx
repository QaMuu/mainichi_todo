import { Routes, Route } from 'react-router-dom';
import {TodoListView} from "./components/TodoListView.tsx";
import { Provider } from 'jotai'

function AppRoutes() {

  return (
    <Provider>
      <Routes>
        <Route path="/" element={<TodoListView />} />
      </Routes>
    </Provider>
  )
}

export default AppRoutes
