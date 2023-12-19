import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {


    return (
        <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <div className="product-item bg-light mb-4">
                <div className="product-img position-relative overflow-hidden">
                    <img className="img-fluid w-100" src={product.image} alt="" />
                    <div className="product-action">
                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                        <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                        <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></a>
                    </div>
                </div>
                <div className="text-center py-4">
                    <Link className="h6 text-decoration-none text-truncate" to={`/detail/${product._id}`}>{product.title}</Link>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>Rs. {product.price}</h5><h6 className="text-muted ml-2"><del>Rs. {product.price}</del></h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-1">
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small className="fa fa-star text-primary mr-1"></small>
                        <small>(99)</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard