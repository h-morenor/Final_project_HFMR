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
  const [changed, setChanged] = useState("false");

  const navigate = useNavigate();

  const { dispatch } = useContext(Auth);

  useEffect(() => {
    const findUser = async () => {
      const response = await fetch(`/api/users/${id}`, {});

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

  const updateUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    if (!picture) {
      formData.append("picture", user.profilePicture);
    }
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
        window.location.reload();

        navigate(`/user/${id}`, { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);

        console.log("Error! please rectify");
      });
  };

  return (
    <div>
      <form>
        <div className="flex align-center text-center w-80">
          <div>
            <div className="  shadow-lg bg-white w-screen h-full">
              <div
                className="overflow-hidden rounded-t-lg h-20"
                style={{ backgroundColor: "#9d789b" }}
              />

              <div className="w-24 -mt-12 overflow-hidden border border-2 border-white rounded-full mx-auto bg-white">
                <img src={`http://localhost:3000/api/group/image/${picture}`} />
              </div>

              <div></div>
              <div className="p-6 flex flex-col item-start text-left">
                <div className="item-start">
                  {/* test */}
                  <label
                    htmlFor="group_pic"
                    className="block mb-1 text-sm font-medium text-gray-900 "
                  >
                    Profile picture
                  </label>
                  {changed === "true" ? (
                    <div>
                      <img
                        className="block mb-1 text-sm font-medium text-gray-900 text-white"
                        alt="not fount"
                        width={"80px"}
                        src={URL.createObjectURL(picture)}
                      />
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-0.5 text-center mt-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={(e) => {
                          setPicture(null);
                          setChanged("false");
                        }}
                      >
                        Remove picture
                      </button>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  {/* end test */}

                  <div className="container mb-1 item-start">
                    <div className="form-group">
                      <input
                        type="file"
                        onChange={(e) => {
                          setPicture(e.target.files[0]);
                          setChanged("true");
                        }}
                      />
                    </div>
                  </div>
                </div>

                <h4 className="flex align-content text-2xl font-semibold mb-1">
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
                <h4 className="flex align-content text-2xl font-semibold mb-1">
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
                <h4 className="flex align-content text-2xl font-semibold mb-1">
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
                </h4>
              </div>
              <div className="justify-center flex gap-1 m-1">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={updateUser}
                >
                  Update User
                </button>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    navigate(`/group/${id}`);
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
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
