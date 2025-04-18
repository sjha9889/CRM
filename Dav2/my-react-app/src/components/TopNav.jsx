import React from 'react'

const TopNav = () => {
  return (
    <header className="topbar-nav">
      <nav className="navbar navbar-expand fixed-top">
        <ul className="navbar-nav mr-auto align-items-center">
          <li className="nav-item">
            <button className="nav-link toggle-menu">
              <i className="icon-menu menu-icon"></i>
            </button>
          </li>
          <li className="nav-item">
            <form className="search-bar">
              <input type="text" className="form-control" placeholder="Enter keywords" />
              <button type="button" className="search-button">
                <i className="icon-magnifier"></i>
              </button>
            </form>
          </li>
        </ul>

        <ul className="navbar-nav align-items-center right-nav-link">
          {/* Notification, user dropdown, etc. */}
        </ul>
      </nav>
    </header>
  )
}

export default TopNav