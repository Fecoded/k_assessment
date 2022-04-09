let stripe = Stripe("pk_test_Hg1Z84tK2xbvtLvEc6IFaRcn00fPvHrllH");
let elements = stripe.elements();

let style = {
  base: {
    color: "#32325d",
    lineHeight: "24px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

// Create an instance of the card Element.
let card = elements.create("card", { style });

// Add an instance of the card Element into the `card-element` <div>.
card.mount("#card-element");

// Handle real-time validation errors from the card Element.
card.addEventListener("change", function (event) {
  let displayError = document.getElementById("card-errors");
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = "";
  }
});

// Handle form submission
let form = document.getElementById("payment-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  stripe.createToken(card).then(function (result) {
    if (result.error) {
      // Inform the user if there was an error
      let errorElement = document.getElementById("card-errors");
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  let form = document.getElementById("payment-form");
  let hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "stripeToken");
  hiddenInput.setAttribute("value", token.id);
  form.appendChild(hiddenInput);

  // Submit the form, uncomment
  //   alert("Created a token with value: " + token.id);
  //   form.submit();

  makeStripePayment(token.id);
}

async function makeStripePayment(stripe_id) {
  fetch(`${WEATHER_URL}/weather/stripe/payment`, {
    method: "POST",
    body: JSON.stringify({
      stripe_id,
      from_airport: airport_type.innerHTML,
      from_country: coun.innerHTML,
      to_airport: airport_type2.innerHTML,
      to_country: coun2.innerHTML,
      total: amount.innerHTML,
    }),

    // Adding headers to the request
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      response.json();
    })

    // Displaying results to console
    .then((data) => {
      window.location.replace(
        "file:///Users/apple/Desktop/Assesement/client/thankyou.html"
      );
    });
}
