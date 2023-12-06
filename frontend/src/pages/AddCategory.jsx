import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { useFormik } from 'formik';
 import * as Yup from 'yup';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddNewCategoryMutation } from '../redux/features/category/categoryApi'

function AddCategory() {

    const [addCategory, { isLoading }] = useAddNewCategoryMutation();

    const {handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue} = useFormik({
        initialValues: {
          title: '',
          image: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().max(30, 'Must be 30 characters or less').required('Required'),
            image: Yup.string(),
        }),
        onSubmit: async (values) => {

            console.log(values);
            const res = await addCategory(values).unwrap();
            console.log(res)
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        },
      });
    
  return (
    <>
        <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Add New Category</span></h2>
        <div className="row px-xl-5">
            <div className="col-lg-12 mb-5">
                <div className="contact-form bg-light p-30">
                    <div id="success"></div>
                    <form name="addProduct" id="contactForm" onSubmit={handleSubmit}>
                        <div className="control-group">
                            <input type="text" onChange={handleChange} onBlur={handleBlur} className="form-control" id="title" name='title' placeholder="Category Title"/>
                            <p className="help-block text-danger">{errors.title && touched.title ? errors.title : null}</p>
                        </div>
                        
                        <div className="control-group">
                            <input type="file" onChange={(event) => {
                                let reader = new FileReader();
                                reader.onloadend = () => {
                                    if (reader.readyState === 2) {
                                        setFieldValue("image", reader.result);
                                        //setPreview(reader.result)
                                    }
                                }
                                reader.readAsDataURL(event.currentTarget.files[0]);
                            }
                            } onBlur={handleBlur} className="form-control" id="image" name='image' placeholder="Product Image"/>
                            <p className="help-block text-danger">{errors.image && touched.image ? errors.image : null}</p>
                        </div>
                       
                        <ToastContainer /> 
                        <div>
                            <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Save Category</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AddCategory