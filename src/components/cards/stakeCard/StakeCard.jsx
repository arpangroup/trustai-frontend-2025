import React from 'react';
import './StakeCard.css';
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';

const StakeCard = ({ image, title, price, currency = 'USD', likes, link = '/post/123', onClick }) => (
  <div className="card-column">
    <div className="bids-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="bids-card-top">
        <img src={image} alt={title} />
        <Link to={link}>
          <p className="bids-title">{title}</p>
        </Link>
      </div>
      <div className="bids-card-bottom">
        <p>{price} <span>{currency}</span></p>
        <p><AiFillHeart /> {likes}</p>
      </div>
    </div>
  </div>
);

export default StakeCard;
