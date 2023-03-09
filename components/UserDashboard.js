import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '@/hooks/fetchTodos'

export default function UserDashboard() {
  const [addTodo, setAddTodo] = useState(false)
  const [todo, setTodo] = useState("")
  const { UserInfo, currentUser } = useAuth()
  const { loading, error, todos,setTodos } = useFetchTodos()
  const [edit,setEdit] = useState(null)
  const [edittedValue, setEdittedValue] = useState('')
  // useEffect(()=>{
  //   if(!UserInfo || Object.keys(UserInfo.lenght === 0)){
  //     setAddTodo(true)
  //   }
  // },[UserInfo])
  async function handleAddTodo() {
    if (!todo) { return }
    const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
    setTodos({ ...todos, [newKey]: todo })
    setTodo('')
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      'todos': {
        [newKey]: todo
      }
    }, { merge: true })
  }

  async function handleEditTodo() {
    if (!edittedValue) { return }
    const newKey = edit
    setTodos({ ...todos, [newKey]: edittedValue })
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
        'todos': {
            [newKey]: edittedValue
        }
    }, { merge: true })
    setEdit(null)
    setEdittedValue('')
}

function handleAddEdit(todoKey) {
    return () => {
        setEdit(todoKey)
        setEdittedValue(todos[todoKey])
    }
}

function handleDelete(todoKey) {
  return async () => {
      const tempObj = { ...todos }
      delete tempObj[todoKey]

      setTodos(tempObj)
      const userRef = doc(db, 'users', currentUser.uid)
      await setDoc(userRef, {
          'todos': {
              [todoKey]: deleteField()
          }
      }, { merge: true })

  }
}

  return (
    <div className='w-full max-w-[65ch] mx-auto text-xs sm:text-sm flex flex-col gap-3 sm:gap-5'>
      <div className='flex items-stretch'>
        <input type="text" placeholder='todo' value={todo} onChange={e => setTodo(e.target.value)} className="flex-1 mr-1 rounded outline-none p-2 text-lg sm:text-xl text-slate-900"></input>
        <button className='w-fit rounded bg-amber-400 hover:bg-amber-500 p-4 sm:p-6 text-white uppercase' onClick={handleAddTodo}>add</button>
      </div>
      {(!loading && todos) &&
      (
      <>
        {Object.keys(todos).map((todo, i) => {
          return (
            <TodoCard handleEditTodo={handleEditTodo} key={i} handleAddEdit={handleAddEdit} edit={edit} todoKey={todo} edittedValue={edittedValue} setEdittedValue={setEdittedValue} handleDelete={handleDelete}>
              {todos[todo]}
            </TodoCard>
          )
        })}
      </>)}
      {/* {!addTodo && <button onClick={() => setAddTodo(!addTodo)} className='text-cyan-300  border border-cyan-300 duration-300 hover:opacity-30 py-2 text-center uppercase text-lg'>add todo</button>} */}
    </div>
  )
}
