import React from "react";
import { useNavigate } from "react-router-dom";
export default function GroupInfo({ group }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/group/${group._id}`);
      }}
      className="flex flex-wrap justify-center  items-end cursor-pointer"
    >
      <span className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center cursor-pointer active:bg-gray-300 transition duration-300 ease w-max"></span>
      <img
        className="object-cover w-10 rounded-lg h-auto  "
        src={`http://localhost:3000/api/group/image/${group.picture}`}
        alt=""
      />
      <div className="flex items-center px-3 py-2 font-bold">{group.title}</div>
      <div className="truncate">{group.description}</div>
    </div>
  );
}
