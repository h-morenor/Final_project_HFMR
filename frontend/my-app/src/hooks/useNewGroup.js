import React, { useContext, useState } from 'react'
import { Auth } from '../context/Auth';

export default function useNewGroup() {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState();
  const [venueLocation, setVenueLocation] = useState(0);
  const [max_people, setMax_people] = useState(0);
  const [category, setCategory] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [groups, setGroups] = useState()
  
  const {user} = useContext(Auth)

  console.log(title);

  const newGroup = async (user) => {

    setIsLoading(true);
    setError(null);

    if (!user) {
      console.log('user not found!')
      setError(json);
      return
    }

    const group = { selectedImage, title, createdBy, description, max_people, category, hashtag, venueLocation };

    const response = await fetch("/api/group/:id/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
      body: JSON.stringify(group),
    });

    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
      console.log("Error! please rectify")
    }

    if (response.ok) {
      console.log(json)
      setGroups(prevState => [...prevState, json])
      setIsLoading(false)
    }   
    
  };



  return { error, isLoading, newGroup };
}
