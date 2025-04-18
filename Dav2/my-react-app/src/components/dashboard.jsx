import React from "react";
import logoIcon from "../assets/images/logo-icon.png";
import "../assets/css/bootstrap.min.css";
import "../assets/css/animate.css";
import "../assets/css/icons.css";
import "../assets/css/sidebar-menu.css";
import "../assets/css/app-style.css";
import useSidebarMenu from "../hooks/useSidebarMenu";


const AdminDashboard = () => {
  const { openMenus, toggleMenu } = useSidebarMenu();
  
  return (
    <div id="wrapper">
      <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
        <div className="brand-logo">
          <a href="/dashboard">
            <img src={logoIcon} className="logo-icon" alt="logo icon" />
            <h5 className="logo-text">Dashtreme Admin</h5>
          </a>
        </div>
        <ul className="sidebar-menu do-nicescrol">
          <li className="sidebar-header">MAIN NAVIGATION</li>
          <li>
            <a href="/dashboard">
              <i className="zmdi zmdi-view-dashboard"></i> <span>Dashboard</span>
            </a>
          </li>
          <li className={`submenu ${openMenus.packages ? 'active' : ''}`}>
  <div className="menu-item-wrapper" onClick={() => toggleMenu('packages')}>
    <a href="#packages" onClick={(e) => e.preventDefault()}>
      <i className="zmdi zmdi-invert-colors"></i>
      <span>Packages</span>
    </a>
    <i className={`menu-arrow fa fa-angle-${openMenus.packages ? 'up' : 'down'}`}></i>
  </div>
  <ul className={`sidebar-submenu ${openMenus.packages ? 'menu-open' : ''}`}>
    <li><a href="/add-package">Add Packages</a></li>
    <li><a href="/view-package">View Packages</a></li>
  </ul>
</li>
<li className={`submenu ${openMenus.destination ? 'active' : ''}`}>
  <div className="menu-item-wrapper" onClick={() => toggleMenu('destination')}>
    <a href="#destination" onClick={(e) => e.preventDefault()}>
      <i className="zmdi zmdi-format-list-bulleted"></i>
      <span>Add Destination</span>
    </a>
    <i className={`menu-arrow fa fa-angle-${openMenus.destination ? 'up' : 'down'}`}></i>
  </div>
  <ul className={`sidebar-submenu ${openMenus.destination ? 'menu-open' : ''}`}>
    <li><a href="/add-destination">Add destination</a></li>
  </ul>
</li>
<li className={`submenu ${openMenus.subscriber ? 'active' : ''}`}>
  <div className="menu-item-wrapper" onClick={() => toggleMenu('subscriber')}>
    <a href="#subscriber" onClick={(e) => e.preventDefault()}>
      <i className="zmdi zmdi-format-list-bulleted"></i>
      <span>Manage Subscriber</span>
    </a>
    <i className={`menu-arrow fa fa-angle-${openMenus.subscriber ? 'up' : 'down'}`}></i>
  </div>
  <ul className={`sidebar-submenu ${openMenus.subscriber ? 'menu-open' : ''}`}>
    <li><a href="/View Subscriber">View Subscriber</a></li>
  </ul>
</li>
<li className={`submenu ${openMenus.booking ? 'active' : ''}`}>
  <div className="menu-item-wrapper" onClick={() => toggleMenu('booking')}>
    <a href="#booking" onClick={(e) => e.preventDefault()}>
      <i className="zmdi zmdi-format-list-bulleted"></i>
      <span>Manage Bookings</span>
    </a>
    <i className={`menu-arrow fa fa-angle-${openMenus.booking ? 'up' : 'down'}`}></i>
  </div>
  <ul className={`sidebar-submenu ${openMenus.booking ? 'menu-open' : ''}`}>
    <li><a href="/view">View Booking</a></li>
  </ul>
</li>
<li className={`submenu ${openMenus.category ? 'active' : ''}`}>
  <div className="menu-item-wrapper" onClick={() => toggleMenu('category')}>
    <a href="#category" onClick={(e) => e.preventDefault()}>
      <i className="zmdi zmdi-format-list-bulleted"></i>
      <span>Category</span>
    </a>
    <i className={`menu-arrow fa fa-angle-${openMenus.category ? 'up' : 'down'}`}></i>
  </div>
  <ul className={`sidebar-submenu ${openMenus.category ? 'menu-open' : ''}`}>
    <li><a href="/add-destination">Add Category</a></li>
    <li><a href="/add-destination">View Category </a></li>
  </ul>
</li>
          <li>
            <a href="calendar.html">
              <i className="zmdi zmdi-calendar-check"></i> <span>Calendar</span>
              <small className="badge float-right badge-light">New</small>
            </a>
          </li>
        </ul>
      </div>

      <header className="topbar-nav">
        <nav className="navbar navbar-expand fixed-top">
          <ul className="navbar-nav mr-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link toggle-menu" href="javascript:void();">
                <i className="icon-menu menu-icon"></i>
              </a>
            </li>
            <li className="nav-item">
              <form className="search-bar">
                <input type="text" className="form-control" placeholder="Enter your name" />
                <a href="javascript:void();"><i className="icon-magnifier"></i></a>
              </form>
            </li>
          </ul>
          <ul className="navbar-nav align-items-center right-nav-link">
            <li className="nav-item dropdown-lg">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();">
                <i className="fa fa-envelope-open-o"></i>
              </a>
            </li>
            <li className="nav-item dropdown-lg">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();">
                <i className="fa fa-bell-o"></i>
              </a>
            </li>
            <li className="nav-item language">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void();"><i className="fa fa-flag"></i></a>
              <ul className="dropdown-menu dropdown-menu-right">
                <li className="dropdown-item"> <i className="flag-icon flag-icon-gb mr-2"></i> English</li>
                <li className="dropdown-item"> <i className="flag-icon flag-icon-fr mr-2"></i> French</li>
                <li className="dropdown-item"> <i className="flag-icon flag-icon-cn mr-2"></i> Chinese</li>
                <li className="dropdown-item"> <i className="flag-icon flag-icon-de mr-2"></i> German</li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown" href="#">
                <span className="user-profile"><img src="https://via.placeholder.com/110x110" className="img-circle" alt="user avatar"/></span>
              </a>
              <ul className="dropdown-menu dropdown-menu-right">
                <li className="dropdown-item user-details">
                  <a href="javaScript:void();">
                    <div className="media">
                      <div className="avatar"><img className="align-self-start mr-3" src="https://via.placeholder.com/110x110" alt="user avatar"/></div>
                      <div className="media-body">
                        <h6 className="mt-2 user-title">Sarajhon Mccoy</h6>
                        <p className="user-subtitle">mccoy@example.com</p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="dropdown-divider"></li>
                <li className="dropdown-item"><i className="icon-envelope mr-2"></i> Inbox</li>
                <li className="dropdown-divider"></li>
                <li className="dropdown-item"><i className="icon-wallet mr-2"></i> Account</li>
                <li className="dropdown-divider"></li>
                <li className="dropdown-item"><i className="icon-settings mr-2"></i> Setting</li>
                <li className="dropdown-divider"></li>
                <li className="dropdown-item"><i className="icon-power mr-2"></i> Logout</li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <div className="clearfix"></div>

      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-content">
              <div className="row row-group m-0">
                <div className="col-12 col-lg-6 col-xl-3 border-light">
                  <div className="card-body">
                    <h5 className="text-white mb-0">9526 <span className="float-right"><i className="fa fa-shopping-cart"></i></span></h5>
                    <p className="mb-0 text-white small-font">Total Orders <span className="float-right">+4.2% <i className="zmdi zmdi-long-arrow-up"></i></span></p>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-3 border-light">
                  <div className="card-body">
                    <h5 className="text-white mb-0">8323 <span className="float-right"><i className="fa fa-usd"></i></span></h5>
                    <div className="progress my-3" style={{height: "3px"}}>
                      <div className="progress-bar" style={{width: "55%"}}></div>
                    </div>
                    <p className="mb-0 text-white small-font">Total Revenue <span className="float-right">+1.2% <i className="zmdi zmdi-long-arrow-up"></i></span></p>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-3 border-light">
                  <div className="card-body">
                    <h5 className="text-white mb-0">6200 <span className="float-right"><i className="fa fa-eye"></i></span></h5>
                    <div className="progress my-3" style={{height: "3px"}}>
                      <div className="progress-bar" style={{width: "55%"}}></div>
                    </div>
                    <p className="mb-0 text-white small-font">Visitors <span className="float-right">+5.2% <i className="zmdi zmdi-long-arrow-up"></i></span></p>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-3 border-light">
                  <div className="card-body">
                    <h5 className="text-white mb-0">5630 <span className="float-right"><i className="fa fa-envira"></i></span></h5>
                    <div className="progress my-3" style={{height: "3px"}}>
                      <div className="progress-bar" style={{width: "55%"}}></div>
                    </div>
                    <p className="mb-0 text-white small-font">Messages <span className="float-right">+2.2% <i className="zmdi zmdi-long-arrow-up"></i></span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-8 col-xl-8">
              <div className="card">
                <div className="card-header">Site Traffic
                  <div className="card-action">
                    <div className="dropdown">
                      <a href="javascript:void();" className="dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown">
                        <i className="icon-options"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="javascript:void();">Action</a>
                        <a className="dropdown-item" href="javascript:void();">Another action</a>
                        <a className="dropdown-item" href="javascript:void();">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="javascript:void();">Separated link</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-inline">
                    <li className="list-inline-item"><i className="fa fa-circle mr-2 text-white"></i>New Visitor</li>
                    <li className="list-inline-item"><i className="fa fa-circle mr-2 text-light"></i>Old Visitor</li>
                  </ul>
                  <div className="chart-container-1">
                    <canvas id="chart1"></canvas>
                  </div>
                </div>
                
                <div className="row m-0 row-group text-center border-top border-light-3">
                  <div className="col-12 col-lg-4">
                    <div className="p-3">
                      <h5 className="mb-0">45.87M</h5>
                      <small className="mb-0">Overall Visitor <span> <i className="fa fa-arrow-up"></i> 2.43%</span></small>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="p-3">
                      <h5 className="mb-0">15:48</h5>
                      <small className="mb-0">Visitor Duration <span> <i className="fa fa-arrow-up"></i> 12.65%</span></small>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="p-3">
                      <h5 className="mb-0">245.65</h5>
                      <small className="mb-0">Pages/Visit <span> <i className="fa fa-arrow-up"></i> 5.62%</span></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 col-xl-4">
              <div className="card">
                <div className="card-header">Weekly sales
                  <div className="card-action">
                    <div className="dropdown">
                      <a href="javascript:void();" className="dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown">
                        <i className="icon-options"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="javascript:void();">Action</a>
                        <a className="dropdown-item" href="javascript:void();">Another action</a>
                        <a className="dropdown-item" href="javascript:void();">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="javascript:void();">Separated link</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="chart-container-2">
                    <canvas id="chart2"></canvas>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center">
                    <tbody>
                      <tr>
                        <td><i className="fa fa-circle text-white mr-2"></i> Direct</td>
                        <td>$5856</td>
                        <td>+55%</td>
                      </tr>
                      <tr>
                        <td><i className="fa fa-circle text-light-1 mr-2"></i>Affiliate</td>
                        <td>$2602</td>
                        <td>+25%</td>
                      </tr>
                      <tr>
                        <td><i className="fa fa-circle text-light-2 mr-2"></i>E-mail</td>
                        <td>$1802</td>
                        <td>+15%</td>
                      </tr>
                      <tr>
                        <td><i className="fa fa-circle text-light-3 mr-2"></i>Other</td>
                        <td>$1105</td>
                        <td>+5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-12">
              <div className="card">
                <div className="card-header">Recent Order Tables
                  <div className="card-action">
                    <div className="dropdown">
                      <a href="javascript:void();" className="dropdown-toggle dropdown-toggle-nocaret" data-toggle="dropdown">
                        <i className="icon-options"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="javascript:void();">Action</a>
                        <a className="dropdown-item" href="javascript:void();">Another action</a>
                        <a className="dropdown-item" href="javascript:void();">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="javascript:void();">Separated link</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush table-borderless">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Photo</th>
                        <th>Product ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Shipping</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Iphone 5</td>
                        <td><img src="https://via.placeholder.com/110x110" className="product-img" alt="product img"/></td>
                        <td>#9405822</td>
                        <td>$ 1250.00</td>
                        <td>03 Aug 2017</td>
                        <td>
                          <div className="progress shadow" style={{height: "3px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: "90%"}}></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Earphone GL</td>
                        <td><img src="https://via.placeholder.com/110x110" className="product-img" alt="product img"/></td>
                        <td>#9405820</td>
                        <td>$ 1500.00</td>
                        <td>03 Aug 2017</td>
                        <td>
                          <div className="progress shadow" style={{height: "3px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: "60%"}}></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>HD Hand Camera</td>
                        <td><img src="https://via.placeholder.com/110x110" className="product-img" alt="product img"/></td>
                        <td>#9405830</td>
                        <td>$ 1400.00</td>
                        <td>03 Aug 2017</td>
                        <td>
                          <div className="progress shadow" style={{height: "3px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: "70%"}}></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Clasic Shoes</td>
                        <td><img src="https://via.placeholder.com/110x110" className="product-img" alt="product img"/></td>
                        <td>#9405825</td>
                        <td>$ 1200.00</td>
                        <td>03 Aug 2017</td>
                        <td>
                          <div className="progress shadow" style={{height: "3px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: "100%"}}></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Hand Watch</td>
                        <td><img src="https://via.placeholder.com/110x110" className="product-img" alt="product img"/></td>
                        <td>#9405840</td>
                        <td>$ 1800.00</td>
                        <td>03 Aug 2017</td>
                        <td>
                          <div className="progress shadow" style={{height: "3px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: "40%"}}></div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Clasic Shoes</td>
                        <td><img src="https://via.placeholder.com/110x110" className="product-img" alt="product img"/></td>
                        <td>#9405825</td>
                        <td>$ 1200.00</td>
                        <td>03 Aug 2017</td>
                        <td>
                          <div className="progress shadow" style={{height: "3px"}}>
                            <div className="progress-bar" role="progressbar" style={{width: "100%"}}></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
   
  );
};

export default AdminDashboard;