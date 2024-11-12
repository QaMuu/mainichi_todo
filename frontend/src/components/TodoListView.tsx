import {useEffect} from "react";

export function TodoListView() {
  // const [aryCategory, setAryCategory] = useState([{}])

  useEffect(() => {
    (async () => {
      console.log('useEffect');
      const _resultGetCategoryTypes = await fetch("http://localhost:3000/api/get/category_types")
      const _aryCategoryTypes = await _resultGetCategoryTypes.json()
      console.log(_aryCategoryTypes);
    })();
  }, []);




  return (
    <>
      <h1>TodoListView</h1>
    </>
  )
}