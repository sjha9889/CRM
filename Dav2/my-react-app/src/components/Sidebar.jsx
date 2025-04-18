import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoIcon from '../assets/images/logo-icon.png'
import useSidebarMenu from '../hooks/useSidebarMenu'

const Sidebar = () => {
  const { openMenus, toggleMenu } = useSidebarMenu()

  const handleMenuClick = (menuKey, e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleMenu(menuKey)
  }

  return (
    <div id="sidebar-wrapper" data-simplebar data-simplebar-auto-hide="true">
      <div className="brand-logo">
        <Link to="/dashboard" className="logo-link">
          <img src={logoIcon} className="logo-icon" alt="logo" />
          <h5 className="logo-text">Dashtreme Admin</h5>
        </Link>
      </div>
      
      <ul className="sidebar-menu do-nicescrol">
        <li className="sidebar-header">MAIN NAVIGATION</li>
        
        <li>
          <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>
            <i className="zmdi zmdi-view-dashboard"></i> 
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className={`submenu ${openMenus.packages ? 'active' : ''}`}>
          <div 
            className="menu-item-wrapper" 
            onClick={(e) => handleMenuClick('packages', e)}
          >
            <a href="#packages" onClick={(e) => e.preventDefault()}>
              <i className="zmdi zmdi-invert-colors"></i>
              <span>Packages</span>
              <i className={`menu-arrow fa fa-angle-${openMenus.packages ? 'up' : 'down'}`}></i>
            </a>
          </div>
          <ul className={`sidebar-submenu ${openMenus.packages ? 'menu-open' : ''}`}>
            <li><Link to="/add-package">Add Packages</Link></li>
            <li><Link to="/view-package">View Packages</Link></li>
          </ul>
        </li>

        <li className={`submenu ${openMenus.destination ? 'active' : ''}`}>
          <div 
            className="menu-item-wrapper" 
            onClick={(e) => handleMenuClick('destination', e)}
          >
            <a href="#destination" onClick={(e) => e.preventDefault()}>
              <i className="zmdi zmdi-format-list-bulleted"></i>
              <span>Destination</span>
              <i className={`menu-arrow fa fa-angle-${openMenus.destination ? 'up' : 'down'}`}></i>
            </a>
          </div>
          <ul className={`sidebar-submenu ${openMenus.destination ? 'menu-open' : ''}`}>
            <li><Link to="/add-destination">Add Destination</Link></li>
          </ul>
        </li>

        <li className={`submenu ${openMenus.subscriber ? 'active' : ''}`}>
          <div 
            className="menu-item-wrapper" 
            onClick={(e) => handleMenuClick('subscriber', e)}
          >
            <a href="#subscriber" onClick={(e) => e.preventDefault()}>
              <i className="zmdi zmdi-accounts"></i>
              <span>Subscribers</span>
              <i className={`menu-arrow fa fa-angle-${openMenus.subscriber ? 'up' : 'down'}`}></i>
            </a>
          </div>
          <ul className={`sidebar-submenu ${openMenus.subscriber ? 'menu-open' : ''}`}>
            <li><Link to="/view-subscriber">View Subscribers</Link></li>
          </ul>
        </li>

        <li className={`submenu ${openMenus.bookings ? 'active' : ''}`}>
          <div 
            className="menu-item-wrapper" 
            onClick={(e) => handleMenuClick('bookings', e)}
          >
            <a href="#bookings" onClick={(e) => e.preventDefault()}>
              <i className="zmdi zmdi-calendar-note"></i>
              <span>Bookings</span>
              <i className={`menu-arrow fa fa-angle-${openMenus.bookings ? 'up' : 'down'}`}></i>
            </a>
          </div>
          <ul className={`sidebar-submenu ${openMenus.bookings ? 'menu-open' : ''}`}>
            <li><Link to="/view-bookings">View Bookings</Link></li>
          </ul>
        </li>

        <li className={`submenu ${openMenus.category ? 'active' : ''}`}>
          <div 
            className="menu-item-wrapper" 
            onClick={(e) => handleMenuClick('category', e)}
          >
            <a href="#category" onClick={(e) => e.preventDefault()}>
              <i className="zmdi zmdi-label"></i>
              <span>Categories</span>
              <i className={`menu-arrow fa fa-angle-${openMenus.category ? 'up' : 'down'}`}></i>
            </a>
          </div>
          <ul className={`sidebar-submenu ${openMenus.category ? 'menu-open' : ''}`}>
            <li><Link to="/add-category">Add Category</Link></li>
            <li><Link to="/view-categories">View Categories</Link></li>
          </ul>
        </li>

        <li>
          <NavLink to="/calendar" className={({isActive}) => isActive ? 'active' : ''}>
            <i className="zmdi zmdi-calendar-check"></i>
            <span>Calendar</span>
            <small className="badge float-right badge-light">New</small>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar