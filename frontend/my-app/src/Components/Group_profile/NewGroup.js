import React, { useContext, useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../hooks/useFindLocation";
//import useNewGroup from "../../hooks/useNewGroup";
import { Auth } from "../../context/Auth";
import { Navigate } from "react-router-dom";
import MyGroups from "../myGroups/MyGroups";
import axios from "axios";

import FilesUploadComponent from "../files-upload-component";

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/round-borders.css";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";

export default function NewGroup({ groups, setGroups }) {
  // const { error, isLoading, newGroup } = useNewGroup();
  // const [img, setImg] = useState();
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState();
  const [createdBy, setCreatedBy] = useState("");
  const [description, setDescription] = useState();
  const [venueLocation, setVenueLocation] = useState("51.505 -0.1");
  const [address, setAddress] = useState("London");
  const [max_people, setMax_people] = useState(100);
  const [category, setCategory] = useState();
  const [hashtag, setHashtag] = useState([]);
  const [display, setDisplay] = useState(hashtag);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const { user } = useContext(Auth);

  //Tags
  const handleTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      //e.preventDefault();
      const value = e.target.value;
      //hashtag.push(value);
      console.log(hashtag);
      setHashtag([...hashtag, value]);
      e.target.value = "";
    }
  };

  //Delete tags
  const removeTag = (removed) => {
    const newtags = hashtag.filter((tag) => tag != removed);
    setHashtag(newtags);
  };

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

  // Formula

  const handleNewGroup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

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
        Authorization: `Bearer ${user.token}`,
        "content-type": "multipart/form-data",
      },
    };

    if (!user) {
      console.log("user not found!");
      setError("User not found!");
      return;
    }

    const url = "/api/group/new";

    axios
      .post(url, formData, config)

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

  /*
<div>
      <label   htmlFor="group_pic"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >    Group picture    </label>
      {selectedImage && (
        <div>
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-0.5 text-center mt-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={()=>setSelectedImage(null)}>  Remove picture </button>

        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
          
      <input
        type="file"
        name="group_pic"
        
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
*/

  return (
    <div className=" h-[calc(100vh-137px)] overflow-y-scroll flex justify-center">
      <form className="w-[360px]">
        <div className="grid gap-3 md:grid-cols-1 ">
          {
            <div>
              {/* test */}
              <label
                htmlFor="group_pic"
                className="block mb-2 text-sm font-medium  text-white"
              >
                Group picture*
              </label>
              {picture && (
                <div>
                  <img
                    alt="not fount"
                    width={"250px"}
                    src={URL.createObjectURL(picture)}
                  />
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-0.5 text-center mt-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={(e) => {
                      setPicture(null);
                    }}
                  >
                    Remove picture
                  </button>
                </div>
              )}
              {/* end test */}

              <div className="container">
                {/* <div className="row"> */}

                <div className="form-group">
                  <input
                    type="file"
                    onChange={(e) => {
                      setPicture(e.target.files[0]);
                    }}
                  />
                </div>
                {/* </div> */}
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
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="The avengers"
              required=""
            />
          </div>
          {/* <div>
            <label
              htmlFor="max_people"
              className="block mb-2 text-sm font-medium  text-white"
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
          </div> */}
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-white"
            >
              {" "}
              Category*{" "}
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select"
              required=""
            />
          </div>

          <div>
            <label
              htmlFor="hashtag"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Hashtags*
            </label>
            <div className="flex">
              <div className="flex gap-1z items-center">
                {hashtag &&
                  hashtag.map((tag, index) => {
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

          <div>
            <label
              htmlFor="Venue address"
              className="block mb-2 text-sm font-medium  text-white"
            >
              Venue address*
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

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium  text-white"
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
              className="block p-2.5 w-full h-10  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
              defaultValue={""}
            />
          </div>
        </div>

        {picture ? (
          <button
            onClick={handleNewGroup}
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-white"
          >
            Submit
          </button>
        ) : (
          <div></div>
        )}

        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
