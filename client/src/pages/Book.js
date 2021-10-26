import { useState } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
// import './App.css';
import StripeContainer from '../components/StripeContainer';
import bookImg from '../assets/cocktail.jpeg'


function Book() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='App'>
			<h1>The Drinkstagram Book</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>$20.00</h3>
					<img src={bookImg} alt='Book' />
					<button 
					className="btn mx-auto d-block donate" 
					onClick={() => setShowItem(true)}>Purchase Drinkstagram Book</button>
				</>
			)}
		</div>
	);
}

export default Book;