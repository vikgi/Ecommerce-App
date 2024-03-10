import React, { Fragment, useEffect , useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import {useSelector, useDispatch} from "react-redux"
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom'; 
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from '../layout/loader/Loader';
import {useAlert} from "react-alert";
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import { Dialog, DialogActions,DialogContent, DialogTitle, Button } from '@material-ui/core';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';



const ProductDetails = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { id } = useParams();
    const {product, loading, error } = useSelector((state) => state.productDetails);
    const {Stock} = product;

    const {success, error: reviewError} = useSelector((state) => state.newReview);
    
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {

        const qty = Math.min(quantity+1, Stock);
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        const qty = Math.max(quantity-1, 1);
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    }

    const submitReviewToggle = () => {
        setOpen(!open)
    }

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError){
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Review Submitted Successfully")
            dispatch({type: NEW_REVIEW_RESET});
        }

        dispatch(getProductDetails(id));
        
    }, [dispatch, id, error, alert, success, reviewError]);
    
    const reviewoptions = {
        color: "rgba(20,20,20, 0.5)",
        activeColor: "tomato",
        size: window.innerWidth < 600? 23:23,
        isHalf: true,
    }

    const options= {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600? 15:23,
    value: product.ratings,
    isHalf: true,
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
}

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        dispatch(newReview(myForm));
        setOpen(false);
    };

  return (
    <Fragment>
        {loading ? (<Loader/>) : 
            (<Fragment>
                <MetaData title={`${product.name} --Ecommerce`}/>
        <div className='ProductDetails'>
            
            <div>
                <Carousel >
                {product.images && 
                    product.images.map((item, i) => (
                    <img
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                    />
                    ))
                }
                </Carousel>
            </div>
            
            <div>
                <div className='detailsBlock-1'>
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className='detailsBlock-2'>
                    <ReactStars  {...options}/>
                    <span>({product.numofReviews} Reviews)</span>
                </div>
                <div className='detailsBlock-3'>
                    <h1>{`₹${product.price}`}</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly type="number" value={quantity} onChange={(e) => {}}/>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button disabled={product.Stock < 1? true: false} onClick={addToCartHandler} >Add to Cart</button>
                    </div>

                    <p>
                        Status:
                        <b className={product.Stock < 1 ? "redColor":"greenColor"}>
                            {product.Stock < 1?"OutOfStock": "InStock"}
                        </b>
                    </p>

                </div>
                    <div className='detailsBlock-4'>
                        Description: <p>{product.description}</p>
                    </div>

                    <button onClick={submitReviewToggle}className='submitReview'>Submit Review</button>

            </div>


        </div>

            <h3 className='reviewsHeading'>REVIEWS</h3>
            
            <Dialog
                aria-labelledby='simple-dialog-title'
                open = {open}
                onClose={submitReviewToggle}

            >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className='submitDialog'>
                    <ReactStars {...reviewoptions} onChange={ratingChanged}/>
                    <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment}
                    onChange={(e)=> setComment(e.target.value)}></textarea>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle}color='secondary'>Cancel</Button>
                    <Button onClick={reviewSubmitHandler}>Submit</Button>
                    
                </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
                <div className='reviews'>
                    {product.reviews && 
                    product.reviews.map((review) => (<ReviewCard key = {review.user} review = {review} />))}
                </div>
            ): (<p className='noReviews'>No Reviews Yet</p> )}


    </Fragment>
)
        
        }
    </Fragment>
  )
}

export default ProductDetails
