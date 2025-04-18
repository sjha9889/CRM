import { useState } from 'react'

const useSidebarMenu = () => {
  const [openMenus, setOpenMenus] = useState({
    packages: false,
    destination: false,
    subscriber: false,
    bookings: false,
    category: false
  })

  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  return { openMenus, toggleMenu }
}

export default useSidebarMenu