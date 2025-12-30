import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";


function userGetAllUser() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = Cookies.get("jwt")
        console.log(token);

        const response = await axios.get("/api/user/getUserProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          Credentials: "include"
        }
        )
        setAllUsers(response.data)
        setLoading(false);
      } catch (error) {
        console.log(error);

      }
    }
    getUsers();



  }, [])
  return [allUsers, loading]
}

export default userGetAllUser 