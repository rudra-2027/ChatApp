import React from 'react'
import User from './User.jsx'
import userGetAllUser from '../../context/userGetAllUser.jsx'

function Users() {
  const [allUsers, loading] = userGetAllUser();
  console.log(allUsers);

  return (
    <div
      style={{ maxHeight: "calc(84vh )" }}
      className="my-2 flex-scroller overflow-y-auto"
    >
      {allUsers.map((user, index) => {
        return <User key={index} user={user} />
      })}
    </div>
  )
}

export default Users