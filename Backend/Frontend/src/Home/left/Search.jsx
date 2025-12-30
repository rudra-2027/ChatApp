import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import userGetAllUser from '../../context/userGetAllUser.jsx'
import useConversation from '../../statemanage/useConversation.js'

function Search() {
  const [search, setSearch] = useState("")
  const [allUsers] = userGetAllUser()
  const { setSelectedConversation } = useConversation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search.trim()) return

    const user = allUsers.find(
      (u) => u.name.toLowerCase() === search.toLowerCase()
    )

    if (user) {
      setSelectedConversation(user)
    }

    setSearch("")
  }

  return (
    <div className='h-[10vh]'>
      <div className='px-6 py-4'>
        <form onSubmit={handleSubmit}>
          <div className='flex space-x-3'>
            <label className='border border-gray-700 bg-slate-900 rounded-lg flex items-center gap-2 w-[80%] p-3'>
              <input
                type="text"
                className='grow outline-none bg-transparent text-white'
                placeholder="Search user"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <button type="submit">
              <IoSearch className='text-4xl p-2 hover:bg-gray-600 rounded-full duration-300 cursor-pointer' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Search
