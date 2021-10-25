import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51JoBJyEHoiwqokExrCauHaI2jEfeeMQsfQlWYERIqLriIbHb0hngKod9YV6WFu9oebn11P7niQKHMSypp7bay1aL00Y5s3dLtO"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}
