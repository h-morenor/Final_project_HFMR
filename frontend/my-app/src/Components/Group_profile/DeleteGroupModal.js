
import React, {useContext, useState} from 'react'
import { Auth } from "../../context/Auth";
import { useNavigate} from 'react-router-dom';

export default function DeleteGroupModal({showModal, onClose, id, setGroup}) {

  
  const {user} = useContext(Auth)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

const deleteGroup = async () => {

  const response = await fetch(`/api/group/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
       }
     }
     );
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
      console.log("Error! please rectify")
      throw(error)
    }
    if (response.ok) {
      setIsLoading(false)
      setError(null);
      console.log(json)
      onClose()
      navigate(`/mygroups`, {replace: true});
      
    }   

}

  return (
 <>
    { showModal ? (
    <div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Are you sure you want to delete this group?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    By clicking yes, all the information of this group will be deleted
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deleteGroup}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        
    </div> 
    ): null  }

  
  </>
  )
}





      
