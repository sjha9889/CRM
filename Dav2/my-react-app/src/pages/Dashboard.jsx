import React from 'react'

const Dashboard = () => {
  return (
    <>
      <div className="card mt-3">
        <div className="card-content">
          <div className="row row-group m-0">
            <div className="col-12 col-lg-6 col-xl-3 border-light">
              <div className="card-body">
                <h5 className="text-white mb-0">9526 <span className="float-right"><i className="fa fa-shopping-cart"></i></span></h5>
                <p className="mb-0 text-white small-font">Total Orders</p>
              </div>
            </div>
            {/* Add other dashboard cards */}
          </div>
        </div>
      </div>

      {/* Add other dashboard sections */}
    </>
  )
}

export default Dashboard