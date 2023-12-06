import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


function SideNavigation() {

    const {user} = useSelector(state=>state.auth);

  return (
    <>
    <div className="col-lg-3 col-md-4">
                {/* <!-- Price Start --> */}
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Admin Navigation</span></h5>
                <div className="bg-light p-4 mb-30">
                    <div class="list-group">
                        {
                            user.role && user.role === 'admin' ? 
                            <>
                                <Link to={`/user/dashboard/add-category`} class="list-group-item list-group-item-action">Add Category</Link>
                                <Link to={`/user/dashboard/add-product`} class="list-group-item list-group-item-action">Add Product</Link>
                            </>
                            :null
                        }
                        
                        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
                        <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
                        <a class="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
                    </div>
                </div>
                {/* <!-- Price End --> */}
                
            </div>
    </>
  )
}

export default SideNavigation