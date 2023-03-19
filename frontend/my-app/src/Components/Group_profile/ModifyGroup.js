import React from "react";
import { Auth } from "../../context/Auth";
import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import axios from "axios";

export default function ModifyGroup() {
  const { user } = useContext(Auth);
  const navigate = useNavigate();

  const [group, setGroup] = useState();
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [venueLocation, setVenueLocation] = useState(0);
  const [max_people, setMax_people] = useState(0);
  const [category, setCategory] = useState("");
  const [hashtag, setHashtag] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState();

  useEffect(() => {
    setError(null);
    if (!user) {
      console.log("user not found!");
      setError("User not found!");
      return;
    }

    const findGroup = async () => {
      //console.log(`/api/group/${id}`)
      const response = await fetch(`/api/group/${id}`, {
        //method: "GET",
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      setGroup(json);
      setTitle(json.title);
      setDescription(json.description);
      setVenueLocation(json.venueLocation);
      setMax_people(json.max_people);
      setCategory(json.category);
      setHashtag(json.hashtag);
      setAddress(json.address);
      setPicture(json.picture);
    };

    findGroup();
  }, [user]);

  /////////

  ////
  //Tags

  const handleTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      // if(e.target.lenght > 0) {
      e.preventDefault();
      const value = e.target.value;
      setHashtag([...hashtag, value]);
      e.target.value = "";

      // }
    }
  };
  //Delete tags

  const removeTag = (removed) => {
    const newtags = hashtag.filter((tag) => tag != removed);
    setHashtag(newtags);
  };

  // Geocoding

  function onPlaceSelect(value) {
    console.log(value);
    console.log("selected");
    console.log(value.properties);

    setAddress(value.properties.formatted);
    console.log(value.properties.formatted);
    //console.log(value.properties.address_line2)
    setVenueLocation(`${value.properties.lat} ${value.properties.lon}`);
    console.log(`${value.properties.lat} ${value.properties.lon}`);
    //console.log("valores")
    //console.log(venueLocation)
  }

  function onSuggectionChange(value) {
    console.log(value);
  }
  //

  // const updateGroup = async () => {
  //   const response = await fetch(`/api/group/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //     body: JSON.stringify({
  //       title: title,
  //       max_people: max_people,
  //       description: description,
  //       category: category,
  //       hashtag: hashtag,
  //       venueLocation: venueLocation,
  //     }),
  //   });
  //   const json = await response.json();
  //   console.log(json);
  //   setGroup(json);
  // };

  ////
  ////
  ///

  const updateGroup = async (event) => {
    event.preventDefault();
    // setIsLoading(true);
    // setError(null);

    const formData = new FormData();

    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("venueLocation", venueLocation);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("category", category);
    formData.append("hashtag", hashtag);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const url = `/api/group/${id}`;

    axios
      .patch(url, formData, config)

      .then((response) => response.data)
      .then((json) => {
        setIsLoading(false);
        setError(null);
        console.log(json);

        navigate(`/group/${json._id}`, { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);
        // setError(json);
        console.log("Error! please rectify");
      });
  };

  /////
  /////

  return (
    <div className=" h-[calc(100vh-137px)] overflow-y-scroll flex justify-center">
      <form className="w-6/12 ">
        <div className="grid gap-6 mb-6 md:grid-cols-1">
          {
            <div>
              <div className="container">
                <div className="row">
                  <h3>React File Upload</h3>
                  <div className="form-group">
                    <input
                      type="file"
                      onChange={(e) => {
                        setPicture(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          <div>
            <label
              htmlFor="group_name"
              className="block mb-2 text-sm font-medium  text-white"
            >
              {" "}
              Group name*{" "}
            </label>
            <input
              type="text"
              id="group_name"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="The avengers"
              required=""
            />
          </div>
          {/* <div>
            <label
              htmlFor="max_people"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ie: 20 or no max"
              required=""
            />
          </div> */}
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-white"
            >
              Category*
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select"
              required=""
            />
          </div>

          {/* <div>
            <label
              htmlFor="hashtag"
              className="block mb-2 text-sm font-medium text-white"
            >
              Hashtags*
            </label>
            <input
              type="text"
              id="hashtag"
              // value={hashtag}
              onKeyDown={handleTags}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Add"
              required=""
            />
          </div> */}

          {/* test*/}

          <div>
            <label
              htmlFor="hashtag"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Hashtags*
            </label>
            <div className="flex">
              <div className="flex gap-1z items-center">
                {hashtag.map((tag, index) => {
                  return (
                    <span
                      key={index}
                      className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full"
                      onClick={() => removeTag(tag)}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              <input
                type="text"
                id="hashtag"
                onKeyDown={handleTags}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter hashtags"
                required=""
              />
            </div>
          </div>

          {/* test end */}

          <div>
            <label
              htmlFor="Venue address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Venue address*
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

          {/*
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
    </div>*/}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white"
          >
            Group description*
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            defaultValue={""}
          />
        </div>

        {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              defaultValue=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required=""
            />
          </div>
        </div> */}
        <div className="flex gap-1 justify-center mt-2">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={updateGroup}
          >
            Update Group
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              navigate(`/group/${group._id}`);
            }}
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
