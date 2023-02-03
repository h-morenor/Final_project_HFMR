import { useEffect, useState } from 'react'
import FetchGroups from '../helpers/FetchGroups'

function useFetchGroups() {
  const [groups, setGroups] = useState([])

  const fetchGroups = async () => {
    const groups = await FetchGroups()
     setGroups(groups)
    console.log("group fetch completed")
  }

  useEffect(() => {
    fetchGroups()
  }, []) 
  return [groups, setGroups]
}

export default useFetchGroups

