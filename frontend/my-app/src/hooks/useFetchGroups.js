import { useEffect, useState } from 'react'
import FetchGroups from '../helpers/FetchGroups'

function useFetchGroups() {
  const [groups, setGroups] = useState([]) 
//  const [series, setSeries] = useState([])
//  const [allData, setAllData] = useState([])#

  const fetchGroups = async () => {
    const groups = await FetchGroups()
    setGroups(groups)
    console.log(groups)

    console.log("group fetch completed")
//    setSeries(series)
//    setAllData(allData)
  }

  useEffect(() => {
    fetchGroups()
  }, []) 
  return [groups, setGroups]
}

export default useFetchGroups

/*
import { useEffect, useState } from 'react'
import FetchData from '../helpers/FetchData'

function useFetchData() {
  const [movies, setMovies] = useState([]) 
  const [series, setSeries] = useState([])
  const [allData, setAllData] = useState([])
  const fetchMovies = async () => {
    const [movies, series, allData] = await FetchData()
    setMovies(movies)
    setSeries(series)
    setAllData(allData)
  }
  useEffect(() => {
    fetchMovies()
  }, []) 
  return [movies, series, allData, setAllData]
}

export default useFetchData
 */