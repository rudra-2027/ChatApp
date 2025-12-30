import axios from 'axios'
import React, { useState } from 'react'
import { LuLogOut } from 'react-icons/lu'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

export default function Logout() {
  const [loading, setLoading] = useState(false)
  const handleLogout = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/user/logout')
      localStorage.removeItem('message')
      Cookies.remove("jwt")
      setLoading(false)
      toast("Logout Successfully")
    } catch (error) {
      toast.error(error)
      console.log(error);

    }

  }
  return (
    <div className='w-[4%] bg-slate-950 text-white flex flex-col justify-end'>
      <div className='p-3'>
        <form action="">
          <div className='flex space-x-3 '>


            <button>
              <LuLogOut

                className='text-4xl p-2 hover:bg-gray-600 rounded-lg duration-300 cursor-pointer' onClick={handleLogout} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

