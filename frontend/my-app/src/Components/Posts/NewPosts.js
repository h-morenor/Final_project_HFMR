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

export default function NewPosts({ groups, setGroups }) {
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState();

  //const [] = useState();
  //const [setUser] = useState();
  const [name, setName] = useState();
  const [max_people, setMax_people] = useState(5);
  const [address, setAddress] = useState("51.505 -0.1");
  const [venueLocation, setVenueLocation] = useState("51.505 -0.1");
  const [post, setPost] = useState();
  const [fromUser, setFromUser] = useState();
  const [toGroup, setToGroup] = useState();
  const [postedByName, setPostedByName] = useState();
  const [postTitle, setPostTitle] = useState();

  const navigate = useNavigate();

  const { user } = useContext(Auth);

  console.log(user);

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

  // Adress geocoding
  function onPlaceSelect(value) {
    console.log(value);
    console.log("selected");
    console.log(value.properties);

    setAddress(value.properties.formatted);
    console.log(value.properties.formatted);
    //console.log(value.properties.address_line2)
    setVenueLocation(`${value.properties.lat} ${value.properties.lon}`);
    console.log(`${value.properties.lat} ${value.properties.lon}`);
  }

  function onSuggectionChange(value) {
    console.log(value);
  }

  //New post handle

  const handleNewPost = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!user) {
      console.log("user not found!");
      setError("User not found!");
      return;
    }

    const newPost = {
      post: post,
      postTitle: postTitle,
      //postUser_group,
      //postedBy,
      //postedByName,
    };

    const response = await fetch(`/api/group/${id}/newpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newPost),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
      console.log("Error! please rectify");
      throw error;
    }
    if (response.ok) {
      setIsLoading(false);
      setError(null);
      console.log(json);

      navigate(`/group/${id}`, { replace: true });
    }
  };

  // Formula

  //   const handleNewGroup = async (event) => {
  //     event.preventDefault();
  //     setIsLoading(true);
  //     setError(null);

  //     const formData = new FormData();

  //     formData.append("title", title);
  //     formData.append("venueLocation", venueLocation);
  //     formData.append("description", description);
  //     formData.append("address", address);
  //     formData.append("category", category);
  //     formData.append("hashtag", hashtag);

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //         "content-type": "multipart/form-data",
  //       },
  //     };

  //     if (!user) {
  //       console.log("user not found!");
  //       setError("User not found!");
  //       return;
  //     }

  //     const url = "/api/group/new";

  //     axios
  //       .post(url, formData, config)

  //       .then((response) => response.data)
  //       .then((json) => {
  //         setIsLoading(false);
  //         setError(null);
  //         console.log(json);

  //         navigate(`/group/${json._id}`, { replace: true });
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         console.log("Error! please rectify");
  //       });
  //   };

  return (
    <div className="overflow-y-scroll h-[calc(100vh-136px)]">
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
              className="ml-2 text-sm font-medium text-white"
            >
              This is an event
            </label>
          </div>

          <div>
            <label
              htmlFor="max_people"
              className="block mb-2 text-sm font-medium text-white"
            >
              {" "}
              Max people{" "}
            </label>
            <input
              type="number"
              id="max_people"
              value={max_people}
              onChange={(e) => {
                setMax_people(e.target.value);
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
                  placeSelect={onPlaceSelect}
                  suggestionsChange={onSuggectionChange}
                />
              </GeoapifyContext>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="postTitle"
            className="block mb-2 text-sm font-medium text-white"
          >
            Subject
          </label>
          <input
            type="text"
            id="postTitle"
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.target.value);
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

        <button
          onClick={handleNewPost}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-white"
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
  );
}
