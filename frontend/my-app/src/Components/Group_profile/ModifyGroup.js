import React from 'react'
import { Auth } from '../../context/Auth';
import { useContext, useState, useNavigate } from 'react';

export default function ModifyGroup({group}) {

  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState();
  const [venueLocation, setVenueLocation] = useState(0);
  const [max_people, setMax_people] = useState(0);
  const [category, setCategory] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState();
 
 // const navigate = useNavigate();

const {user} = useContext(Auth)

//console.log(groups)


  return (
    <div>   

    <form className="m-10">
    <div className="grid gap-6 mb-6 md:grid-cols-1">
     
    
    <div>
      <label      htmlFor="group_name"     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >    Group name    </label>
      <input
        type="text"
        id="group_name"
        value={title}
        onChange={(e) => {     setTitle(e.target.value);    }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="The avengers"
        required=""
      />
    </div>
    <div>
      <label    htmlFor="max_people"    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >    Max people    </label>
      <input
        type="number"
        id="max_people"
        value={max_people}
        onChange={(e) => {     setMax_people(e.target.value);    }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="ie: 20 or no max"
        required=""
      />
    </div>
    <div>
      <label   htmlFor="category"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >     Category   </label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => {     setCategory(e.target.value);    }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Select"
        required=""
      />
    </div>
    
    <div>
      <label   htmlFor="hashtag"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >     Hashtags   </label>
      <input
        type="text"
        id="hashtag"
        value={hashtag}
        onChange={(e) => {     setHashtag(e.target.value);    }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Add"
        required=""
      />
    </div>


    <div>
      <label
        htmlFor="website"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Website URL
      </label>
      <input
        type="url"
        id="website"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="other.com"
        required=""
      />
    </div>
    <div>
        <div>
      <label htmlFor="venueLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Venue location
      </label>
      <input
        type="address"
        id="venueLocation"
        value={venueLocation}
        onChange={(e) => {     setVenueLocation(e.target.value);    }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
        required=""
      />
      <button     className="p-2 border border-red-400 rounded-md"   >   Get current location      </button>
      </div>
    </div>
  </div>
  
  <div>
  <label
    htmlFor="description"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Group description
  </label>
  <textarea
    id="description"
    value={description}

    onChange={(e) => {     setDescription(e.target.value);    }}
    rows={4}
    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Write your thoughts here..."
    defaultValue={""}
    />
    </div>

  
  
  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input
        id="remember"
        type="checkbox"
        defaultValue=""
        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        required=""
      />
    </div>
    <label
      htmlFor="remember"
      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      I agree with the{" "}
      <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
        terms and conditions
      </a>
      .
    </label>
  </div>
  <button 
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Submit
  </button>
   
    {error && (
    <div>
    <p>{error}</p>
    </div>
    )}                   
   
</form>

    </div>
  )


}


//onClick={handleNewGroup} 