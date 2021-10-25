import { useState } from 'react';
import './App.css';
import StripeContainer from './components/StripeContainer';

function App() {
	const [showItem, setShowItem] = useState(false);
	return (
		<div className='App'>
			<h1>The Drinkstagram Book</h1>
			{showItem ? (
				<StripeContainer />
			) : (
				<>
					<h3>$20.00</h3>
					<img src={ require('./assets/cocktail.jpeg').default } alt='Book' />
					<button onClick={() => setShowItem(true)}>Purchase Drinkstagram Book</button>
				</>
			)}
		</div>
	);
}

export default App;
