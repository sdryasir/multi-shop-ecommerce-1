import React from 'react'
import Breadcrumb from '../components/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQty, decreaseQty } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';



function Cart() {
    let itemExist;
    const { cart } = useSelector(state => state.cart);

    const dispatch = useDispatch()
    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    }

    const handleDecQuantity = (product) => {
        itemExist = cart && cart.find(ci => ci._id === product._id);
        dispatch(decreaseQty(product))
    }
    const handleIncQty = (product) => {
        itemExist = cart && cart.find(ci => ci._id === product._id);
        dispatch(increaseQty(itemExist))
    }


    let subTotal = 0;
    for (let c in cart) {
        subTotal += cart[c].price * cart[c].quantity;
    }

    return (
        <>
            <Breadcrumb />
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">


                                {
                                    cart && cart.map(item => <tr>
                                        <td className="align-middle"><img src={item.image} alt="" style={{ width: '50px' }} /> {item.title}</td>
                                        <td className="align-middle">${item.price}</td>
                                        <td className="align-middle">
                                            <div className="input-group quantity mx-auto" style={{ width: '100px' }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-minus" disabled={item?.quantity <= 1 ? true : false} onClick={() => handleDecQuantity(item)}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input type="text" onChange={() => true} className="form-control form-control-sm bg-secondary border-0 text-center" value={item ? item?.quantity : '1'} />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleIncQty(item)}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">${item?.quantity * item.price}</td>
                                        <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => handleRemove(item)}><i className="fa fa-times"></i></button></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                        <form className="mb-30" action="">
                            <div className="input-group">
                                <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Apply Coupon</button>
                                </div>
                            </div>
                        </form>
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3">
                                    <h6>Subtotal</h6>
                                    <h6>${subTotal}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Shipping</h6>
                                    <h6 className="font-weight-medium">${Math.floor(subTotal * 0.01)}</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Total</h5>
                                    <h5>${subTotal + Math.floor(subTotal * 0.01)}</h5>
                                </div>
                                <Link to={'/checkout'} className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart