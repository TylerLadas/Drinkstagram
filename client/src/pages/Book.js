import { useState } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
// import './App.css';
// import StripeContainer from '../components/StripeContainer';
import bookImg from '../assets/cocktail.jpeg'
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51JoUw3H60lKUSgoQn6tn6tGv8Xpnr08lCyY3TDtiNDqPY3FFS51W23oj2GG4Z1pUkl8CHeLGH1FYBnyFXGWbDThI00h2tukjnq"
);


// function Book() {
// 	const [showItem, setShowItem] = useState(false);

const BuyButton = ({ itemID, ammount }) => {
	const handleClick = async (event) => {
		const stripe = await stripePromise;
	  
		  stripe
			.redirectToCheckout({
			  lineItems: [{ price: itemID, quantity: 1 }],
			  mode: "payment",
			  successUrl: window.location.protocol + "//nameless-spire-26834.herokuapp.com/",
			  cancelUrl: window.location.protocol + "//nameless-spire-26834.herokuapp.com/",
			//   submitType: "donate"
			})
			.then(function (result) {
			  if (result.error) {
				console.log(result);
			  }
			});
		};
	return (

		<div className='book'>
			<h1>The Drinkstagram Book</h1>
			<p>A collection of our most popular cocktails!</p>
					<h3>$20.00</h3>
					<img src={bookImg} alt='Book' />
					<button
						className="btn mx-auto d-block donate"
						onClick={handleClick}
						>Purchase Drinkstagram Book</button>
		</div>

	);
}

export default function App() {
	return (
	  <>
		<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none donate-div">
		  <BuyButton
			ammount={"20.00"}
			itemID="price_1JpFaEH60lKUSgoQkjClaDVT"
		  ></BuyButton>
		</div>
	  </>
	);
  }