import React, { Fragment, useEffect, useState } from 'react';
import "./newproduct.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import { AccountTree } from '@material-ui/icons';
import { Description } from '@material-ui/icons';
import { Storage } from '@material-ui/icons';
import { Spellcheck } from '@material-ui/icons';
import { AttachMoney } from '@material-ui/icons';
import SideBar from './SideBar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {loading, error, success} = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tshirts",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(()=> {
        if(error){
            console.log(error);
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Product Created Successfully");
            navigate("/admin/dashboard");
            dispatch({type: NEW_PRODUCT_RESET});
        }


    }, [dispatch, alert, error, navigate, success]);
    



    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
        images.forEach((image)=> {
            myForm.append("images", image);
        });
        
        const imagesCount = myForm.getAll('images').length;
        console.log('Number of images:', imagesCount);

        dispatch(createProduct(myForm));


    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old)=> [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };












  return (
    <Fragment>
        <MetaData title={`Create Product`} />
        <div className='dashboard'>
            <SideBar/>
            <div className='newProductContainer'>
                <form className='createProductForm' encType='multipart/form-data' onSubmit={createProductSubmitHandler}>

                <h1>Create Product</h1>
                <div>
                    <Spellcheck/>
                    <input type="text" placeholder='Product Name'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <AttachMoney/>
                    <input type="number" placeholder='Price'
                    required
                    onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <Description/>
                    <textarea
                    placeholder='Product Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    cols="30"
                    rows = "1"/>
                </div>

                <div>
                    <AccountTree/>
                    <select 
                        onChange={(e) => setCategory(e.target.value)}
                    >
                    
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                        <option key={cate} value={cate}>{cate}</option>
                    ))}

                    </select>
                </div>

                <div>
                    <Storage/>
                    <input type="number" placeholder='Stock'
                    required
                    onChange={(e) => setStock(e.target.value)} />
                </div>

                <div id='createProductFormFile'>
                    <input 
                    type="file" 
                    name="avatar"
                    accept='image/*'
                    onChange={createProductImagesChange}
                    multiple
                    />

                </div>

                <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                    ))}
                </div>

                <Button
                    id='createProductBtn'
                    type='submit'
                    disabled={loading ? true: false}
                >
                    Create
                    
                </Button>


                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default NewProduct
