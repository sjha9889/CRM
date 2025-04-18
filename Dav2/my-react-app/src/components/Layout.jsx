import React from 'react'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import { Outlet } from 'react-router-dom' // Add this import

const Layout = () => {
  return (
    <div className="bg-theme bg-theme1">
      <div id="wrapper">
        <Sidebar />
        <TopNav />
        <div className="content-wrapper">
          <div className="container-fluid">
            <Outlet /> {/* This renders the matched child routes */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout