import React from 'react';
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/user.png";

const ReviewCard = ({review}) => {

    const options= {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600? 15:23,
    value: (review.rating)? review.rating: 0,
    isHalf: true,
  };

  return (
    <div className='reviewCard'>
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
