import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "../../hooks/useFindLocation";
//import useNewGroup from "../../hooks/useNewGroup";
import { Auth } from "../../context/Auth";

import MyGroups from "../myGroups/MyGroups";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";

export default function EditPost() {
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState();

  //const [] = useState();
  //const [setUser] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [post, setPost] = useState();
  const [groupId, setGroupId] = useState();
  //   const [fromUser, setFromUser] = useState();
  //   const [toGroup, setToGroup] = useState();
  //   const [postedByName, setPostedByName] = useState();
  const [postTitle, setPostTitle] = useState();

  const navigate = useNavigate();

  const { user } = useContext(Auth);
  const { id } = useParams();

  console.log(id);

  ////
  /////
  useEffect(() => {
    const findUser = async () => {
      const response = await fetch(`/api/users/${user.userId}`, {});
      const json = await response.json();
      console.log(json);
      console.log(json.name);
      setName(json.name);
    };

    findUser();
  }, []);

  ////
  ///

  useEffect(() => {
    const findPost = async () => {
      try {
        const response = await fetch(`/api/group/${id}/get1post`, {});

        const json = await response.json();
        setDate(json.date);
        setAddress(json.address);
        setPost(json.post);
        setPostTitle(json.postTitle);
        setGroupId(json.postUser_group[1]);
      } catch {
        console.log("error");
      }
    };

    findPost();
  }, []);

  // Adress geocoding
  function onPlaceSelect(value) {
    // console.log(value);
    // console.log("selected");
    // console.log(value.properties);

    setAddress(value.properties.formatted);
    console.log(value.properties.formatted);
    //console.log(value.properties.address_line2)
    setVenueLocation(`${value.properties.lat} ${value.properties.lon}`);
    console.log(`${value.properties.lat} ${value.properties.lon}`);
  }

  function onSuggectionChange(value) {
    console.log(value);
  }

  //Update post handle

  const updatePost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/group/${id}/editpost`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          date: date,
          address: address,
          postTitle: postTitle,
          post: post,
        }),
      });
      const json = await response.json();
      console.log(json);
      navigate(`/group/${groupId}`, { replace: true });
    } catch {
      console.log("error");
    }
  };

  //   const updatePost = async (event) => {
  //     event.preventDefault();
  //     // setIsLoading(true);
  //     // setError(null);

  //     if (!user) {
  //       console.log("user not found!");
  //       setError("User not found!");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("date", date);
  //     formData.append("address", address);
  //     formData.append("postTitle", postTitle);
  //     formData.append("post", post);

  //     const config = {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     const url = `/api/group/${id}/editpost`;

  //     console.log(formData);
  //     console.log(postTitle);
  //     axios
  //       .patch(url, formData, config)
  //       .then((response) => response.data)
  //       .then((json) => {
  //         setIsLoading(false);
  //         setError(null);
  //         console.log(json);
  //         console.log("success");

  //         //navigate(`/group/${groupId}`, { replace: true });
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         // setError(json);
  //         console.log("Error! please rectify");
  //       });
  /////
  ///
  ////

  // if (!response.ok) {
  //   setIsLoading(false);
  //   setError(json);
  //   console.log("Error! please rectify");
  //   throw error;
  // }
  // if (response.ok) {
  //   setIsLoading(false);
  //   setError(null);
  //   console.log(json);

  //   navigate(`/group/${id}`, { replace: true });
  // }
  //   };

  return (
    <div className="h-[calc(100vh-136px)]">
      <form className="m-auto w-6/12">
        <div className="grid gap-3 md:grid-cols-1">
          <div className="flex gap-1">
            <label className="block mb-2 text-sm font-medium text-white">
              From:
            </label>
            <label
              htmlFor="user_name"
              className="block mb-2 text-sm font-medium text-white"
            >
              {name}
            </label>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-white"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ie: 20 or no max"
              required=""
            />
          </div>

          <div>
            <label
              htmlFor="Venue address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Venue address
            </label>
            <div>
              <GeoapifyContext apiKey="178a21e11be94a9f8f92b2a0221c8ac5">
                <GeoapifyGeocoderAutocomplete
                  placeholder="Enter address of the venue here"
                  required="yes"
                  value={address}
                  placeSelect={onPlaceSelect}
                  suggestionsChange={onSuggectionChange}
                />
              </GeoapifyContext>
            </div>
          </div>

          <div>
            <label
              htmlFor="postTitle"
              className="block mb-2 text-sm font-medium text-white"
            >
              Post title
            </label>
            <input
              type="text"
              id="postTitle"
              value={postTitle}
              onChange={(e) => {
                setPostTitle(e.target.value);
                console.log(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ie: 20 or no max"
              required=""
            />
          </div>

          <div>
            <label
              htmlFor="post"
              className="block mb-2 text-sm font-medium text-white"
            >
              Post
            </label>
            <textarea
              id="post"
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
              rows={4}
              className="block p-2.5 w-full h-20 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              defaultValue={""}
            />
          </div>
        </div>

        <div className="flex gap-1 justify-center mt-2 sm:flex-row">
          <button
            onClick={updatePost}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-white mt-2"
          >
            Submit
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(post._id);
              navigate(`/group/${groupId}`);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-white mt-2"
          >
            Cancel
          </button>
        </div>

        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
