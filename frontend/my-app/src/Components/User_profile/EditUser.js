import React, { useEffect } from "react";
import { Auth } from "../../context/Auth";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import axios from "axios";

export default function EditUser() {
  //const { user } = useContext(Auth);
  const { id } = useParams();
  console.log(id);

  const [user, setUser] = useState();

  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();
  const [picture, setPicture] = useState();
  const [isLoading, setIsLoading] = useState();

  const navigate = useNavigate();

  const { dispatch } = useContext(Auth);

  //////
  // const { error2, isLoading2, login } = useLogin();

  // const handleLogin = async () => {
  //   await login(email, password);
  // };
  /////

  useEffect(() => {
    // setError(null);
    // if (!user) {
    //   console.log("user not found!");
    //   setError("User not found!");
    //   return;
    // }

    const findUser = async () => {
      const response = await fetch(`/api/users/${id}`, {
        // headers: {
        //   method: "POST",
        //   //     Authorization: `Bearer ${user.token}`,
        // },
      });

      console.log("test1");

      const json = await response.json();
      console.log(json);
      setUser(json);
      setPicture(json.profilePicture);
      setName(json.name);
      setAge(json.age);
      setEmail(json.email);
      setDescription(json.description);
    };

    findUser();
  }, []);

  // const updateUser = async () => {
  //   try {
  //     const response = await fetch(`/api/users/${id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify({
  //         name: name,
  //         age: age,
  //         description: description,
  //       }),
  //     });
  //     console.log("trying to update");
  //     const json = await response.json();
  //     console.log(json);
  //     setUser(json);
  //     // navigate(`/user/${user._id}`, { replace: true });
  //   } catch {
  //     console.log("error");
  //   }
  // };

  ///
  /////////////////////////////////////
  ////////////////////////////////////
  const updateUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("name", name);
    formData.append("age", age);
    formData.append("description", description);

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

    const url = `/api/users/${id}`;

    axios
      .patch(url, formData, config)

      .then((response) => response.data)
      .then((json) => {
        setIsLoading(false);
        setError(null);
        console.log(json);

        ///////
        /////////
        //////
        // localStorage.setItem("user", JSON.stringify(json));
        // // Updating the global Auth context
        // dispatch({ type: "LOGIN", payload: json });

        ///////
        /////////
        //////

        navigate(`/user/${id}`, { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);

        console.log("Error! please rectify");
      });
  };
  //
  //////
  /////
  /////

  return (
    <div>
      <form>
        <div className="flex align-center text-center w-80">
          <div>
            <div className="  shadow-lg bg-white w-screen h-full">
              <div
                className="overflow-hidden rounded-t-lg h-28"
                style={{ backgroundColor: "#9d789b" }}
              />

              <div className="w-24 -mt-12 overflow-hidden border border-2 border-white rounded-full mx-auto bg-white">
                <img src={`http://localhost:3000/api/group/image/${picture}`} />
              </div>
              <div className="p-6">
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
                <h4 className="flex align-content text-2xl font-semibold mb-4">
                  <input
                    type="text"
                    id="user_name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    required=""
                  />
                </h4>

                <hr />
                <h4 className="flex align-content text-2xl font-semibold mb-4">
                  <input
                    type="number"
                    id="user_age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    className=" bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Age"
                    required=""
                  />
                </h4>
                <p className="mt-4">
                  <input
                    type="text"
                    id="user_description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 h-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                    required=""
                  />
                </p>
              </div>

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={updateUser}
              >
                Update User
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  navigate(`/user/${user._id}`);
                }}
              >
                Cancel
              </button>

              {error && (
                <div>
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

///////////////////////////////////////////////////////////

//   return (
//     <div>

//     <form className="m-10">
//     <div className="grid gap-6 mb-6 md:grid-cols-1">

//     <div>
//       <label      htmlFor="group_name"     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >    Group name    </label>
//       <input
//         type="text"
//         id="group_name"
//        value = {title}
//         onChange={(e) => {     setTitle(e.target.value);    }}
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="The avengers"
//         required=""
//       />
//     </div>
//     <div>
//       <label    htmlFor="max_people"    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >    Max people    </label>
//       <input
//         type="number"
//         id="max_people"
//        value={max_people}
//         onChange={(e) => {     setMax_people(e.target.value);    }}
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="ie: 20 or no max"
//         required=""
//       />
//     </div>
//     <div>
//       <label   htmlFor="category"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >     Category   </label>
//       <input
//         type="text"
//         id="category"
//         value={category}
//         onChange={(e) => {     setCategory(e.target.value);    }}
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="Select"
//         required=""
//       />
//     </div>

//     <div>
//       <label   htmlFor="hashtag"   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"   >     Hashtags   </label>
//       <input
//         type="text"
//         id="hashtag"
//         value={hashtag}
//         onKeyDown={handleTags}
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder="Add"
//         required=""
//       />
//     </div>

//  <div>
//   <label
//     htmlFor="Venue address"
//     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
//     Venue address
//   </label>
//   <div>
//     <GeoapifyContext apiKey="178a21e11be94a9f8f92b2a0221c8ac5" >
//       <GeoapifyGeocoderAutocomplete placeholder="Enter address of the venue here" required="yes" value={address}

//         placeSelect={onPlaceSelect}
//         suggestionsChange={onSuggectionChange}
//         />
//     </GeoapifyContext>
//     </div>
//   </div>

//   {/*
//     <div>
//         <div>
//       <label htmlFor="venueLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//         Venue location
//       </label>
//       <input
//         type="address"
//         id="venueLocation"
//        value={venueLocation}
//         onChange={(e) => {     setVenueLocation(e.target.value);    }}
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//         placeholder=""
//         required=""
//       />
//       <button     className="p-2 border border-red-400 rounded-md"   >   Get current location      </button>
//       </div>
//     </div>*/}

//   </div>

//   <div>
//   <label
//     htmlFor="description"
//     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//   >
//     Group description
//   </label>
//   <textarea
//     id="description"
//    value={description}

//     onChange={(e) => {     setDescription(e.target.value);    }}
//     rows={4}
//     className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     placeholder="Write your thoughts here..."
//     defaultValue={""}
//     />
//     </div>

//   <div className="flex items-start mb-6">
//     <div className="flex items-center h-5">
//       <input
//         id="remember"
//         type="checkbox"
//         defaultValue=""
//         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
//         required=""
//       />
//     </div>
//     <label
//       htmlFor="remember"
//       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//     >
//       I agree with the{" "}
//       <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
//         terms and conditions
//       </a>
//       .
//     </label>
//   </div>
//   <button
//     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//   onClick={updateGroup}
//   >
//     Update Group
//   </button>
//   <button
//     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//   onClick={() => {navigate(`/group/${group._id}`)}}
//   >
//     Cancel
//   </button>

//     {error && (
//     <div>
//     <p>{error}</p>
//     </div>
//     )}

// </form>

//     </div>
//   )

// }
