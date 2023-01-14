import React from 'react'
import { Auth } from '../../context/Auth';
import { useContext, useState } from 'react';

export default function EditUser() {
/*
    const {user} = useContext(Auth)
    const id= user.id

    const [name, setName] = useState(user.name)
    const [age, setAge] = useState(user.age)
    const [description, setDescription] = useState(user.description)*/

    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [description, setDescription] = useState()


  return (
    <div>
        
        <form>
    <div className="flex align-center text-center w-80">
        <div>
          
          <div className="  shadow-lg bg-white w-screen h-full">
            <div className="overflow-hidden rounded-t-lg h-28" style={{backgroundColor: '#9d789b'}} />
            
            <div className="w-24 -mt-12 overflow-hidden border border-2 border-white rounded-full mx-auto bg-white">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp" />
            </div>
            <div className="p-6">

              <h4 className="flex align-content text-2xl font-semibold mb-4">
                <input
                type="text"
                id="user_name"
                value={name}
                onChange={(e) => {     setName(e.target.value);    }}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required="" />
              </h4>

              <hr />
              <h4 className="flex align-content text-2xl font-semibold mb-4">
                <input
                type="number"
                id="user_age"
                value={age}
                onChange={(e) => {     setAge(e.target.value);    }}
                className=" bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Age"
                required="" />
              </h4>
              <p className="mt-4">
                <input
                type="text"
                id="user_description"
                value={description}
                onChange={(e) => {     setDescription(e.target.value);    }}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 h-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description"
                required="" />
              </p>

            </div>
            <button  
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
              Update
            </button>
          </div>
          
        </div>
      </div>
</form>

    </div>
  )
}
