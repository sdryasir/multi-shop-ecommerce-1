import React from 'react'
import Breadcrumb from '../components/Breadcrumb';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux'

function Checkout() {
    const {handleChange, handleBlur, handleSubmit, touched, values, errors} = useFormik({
        initialValues: {
          fname: '',
          lname: '',
          email: '',
          mobileNo:'',
          address1:'',
          address2:'',
          country:'',
          city:'',
          state:'',
          zip:''
        },
        validationSchema: Yup.object({
          fname: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
          lname: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          mobileNo: Yup.string().required('Required'),
          address1: Yup.string().max(300, 'Must be 300 characters or less').required('Required'),
          address2: Yup.string().max(300, 'Must be 300 characters or less').required('Required'),
          country: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
          city: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
          state: Yup.string().max(50, 'Must be 50 characters or less').required('Required'),
          zip: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        }),
        onSubmit: values => {
          console.log(values);
        },
      });

      const { cart } = useSelector(state => state.cart);

      let subTotal = 0;
        for (let c in cart) {
            subTotal += cart[c].price * cart[c].quantity;
        }
  return (
    <>
    <Breadcrumb/>
    <div className="container-fluid">
        <form onSubmit={handleSubmit}>
            <div className="row px-xl-5">
                <div className="col-lg-8">
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Address</span></h5>
                    <div className="bg-light p-30 mb-5">
                        
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" name="fname" value={values.fname} onChange={handleChange} onBlur={handleBlur} placeholder="John"/>
                                {touched.fname && errors.fname ? (<div className='text-danger'>{errors.fname}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" name="lname" value={values.lname} onChange={handleChange} onBlur={handleBlur} placeholder="Doe"/>
                                {touched.lname && errors.lname ? (<div className='text-danger'>{errors.lname}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>E-mail</label>
                                <input className="form-control" type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="example@email.com"/>
                                {touched.email && errors.email ? (<div className='text-danger'>{errors.email}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Mobile No</label>
                                <input className="form-control" type="text" name="mobileNo" value={values.mobileNo} onChange={handleChange} onBlur={handleBlur} placeholder="+123 456 789"/>
                                {touched.mobileNo && errors.mobileNo ? (<div className='text-danger'>{errors.mobileNo}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 1</label>
                                <input className="form-control" type="text" name="address1" value={values.address1} onChange={handleChange} onBlur={handleBlur} placeholder="123 Street"/>
                                {touched.address1 && errors.address1 ? (<div className='text-danger'>{errors.address1}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Address Line 2</label>
                                <input className="form-control" type="text" name="address2" value={values.address2} onChange={handleChange} onBlur={handleBlur} placeholder="123 Street"/>
                                {touched.address2 && errors.address2 ? (<div className='text-danger'>{errors.address2}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Country</label>
                                <select className="custom-select" name="country" value={values.country} onChange={handleChange} onBlur={handleBlur}>
                                    <option value={'Pak'}>Pakistan</option>
                                    <option value={'US'}>United States</option>
                                    <option value={'AFG'}>Afghanistan</option>
                                </select>
                                {touched.country && errors.country ? (<div className='text-danger'>{errors.country}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>City</label>
                                <input className="form-control" type="text" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} placeholder="New York"/>
                                {touched.city && errors.city ? (<div className='text-danger'>{errors.city}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>State</label>
                                <input className="form-control" type="text" name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} placeholder="New York"/>
                                {touched.state && errors.state ? (<div className='text-danger'>{errors.state}</div>) : null}
                            </div>
                            <div className="col-md-6 form-group">
                                <label>ZIP Code</label>
                                <input className="form-control" type="text" name="zip" value={values.zip} onChange={handleChange} onBlur={handleBlur} placeholder="123"/>
                                {touched.zip && errors.zip ? (<div className='text-danger'>{errors.zip}</div>) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
                    <div className="bg-light p-30 mb-5">
                        <div className="border-bottom">
                            <h6 className="mb-3">Products</h6>

                            {
                                cart && cart.map(item=>(
                                <div className="d-flex justify-content-between">
                                    <p>{item.title} x <strong>{item.quantity}</strong></p>
                                    <p>${item.quantity * item.price}</p>
                                </div>
                                ))
                            }

                        </div>
                        <div className="border-bottom pt-3 pb-2">
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
                        </div>
                    </div>
                    <div className="mb-5">
                        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
                        <div className="bg-light p-30">
                            <div className="form-group">
                                <div className="custom-control custom-radio">
                                    <input type="radio" className="custom-control-input" onChange={()=>true} name="payment" id="paypal"/>
                                    <label className="custom-control-label" htmlFor="paypal">Stripe</label>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <div className="custom-control custom-radio">
                                    <input type="radio" className="custom-control-input" onChange={()=>true} name="payment" id="banktransfer"/>
                                    <label className="custom-control-label" htmlFor="banktransfer">Cash On Delivery</label>
                                </div>
                            </div>
                            <button type='submit' className="btn btn-block btn-primary font-weight-bold py-3">Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default Checkout