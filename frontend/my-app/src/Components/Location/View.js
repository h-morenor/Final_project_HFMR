import { useMap } from 'react-leaflet'

function View({ center }) {
  const map = useMap()
  map.setView(center)
  return null
}

export default View;