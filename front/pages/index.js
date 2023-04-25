import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import axios from 'axios'
import { AiFillDelete } from 'react-icons/ai'


export default function Home() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/todos', {
      todo: todo
    })
      .then((res) => {
        console.log(res.data)
        setTodo("")
        window.location.reload(true);
      })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/todos/${id}`)
      .then((res) => {
        console.log(res)
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    axios.get('http://localhost:8000/todos')
      .then((res) => {
        console.log(res.data[0])
        setTodos(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <div className="flex justify-center pt-40">
        <div className="max-w-sm w-full shadow-lg bg-white p-8 rounded-xl opacity-70">

          <div className="flex justify-center cursor-default bg-gray-200 rounded-3xl px-4 py-1 color-gray hover:scale-110 transition-all">
            <div className="w-full p-3">
              <p className="text-3xl text-gray-600">Todo List</p>
              <p className="text-sm">{format(new Date(), 'MMMM d, yyyy')}</p>
            </div>
          </div>

          <div className="relative mt-10 ">
            <div className="absolute inset-y-0 left-2 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16"> <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" /> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" /></svg>
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" id="newTodo" value={todo} onChange={(e) => setTodo(e.target.value)} className="block w-full pl-10 p-2 border-4 rounded-full bg-gray-600 text-white" placeholder="new todo item" />
            </form>
          </div>

          <div className="mt-7">
            <ol className="space-y-2">
              {Object.keys(todos).map((key) => (
                <li key={key} className="flex justify-between items-center bg-gray-200 rounded-3xl ">
                  <div className="w-full p-3 flex justify-between ">
                    <p className="text-2xl text-gray-600 mx-4">{todos[key].title}</p>
                    <AiFillDelete color='red' className="text-2xl text-gray-600 cursor-pointer"
                      onClick={() => handleDelete(todos[key]._id)}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}