function loadStripe(){
//document.addEventListener('DOMContentLoaded', function () {
    if(document.getElementById("card-display") !== null) {
      console.log("This is stripe...");  
    //console.log('This is sessionID ' + sessionId);
    document.querySelector("button").disabled = true;
    var cartId = document.getElementById("card-id").innerHTML;
    console.log(cartId);
    // A reference to Stripe.js
    var stripe;
    //var stripe = Stripe('pk_test_fJMqY2qUl2GKEsb4DPuvUrsE00Cu8SIepp');
    
    var orderData = {
    items: [{ id: "photo-subscription" }],
    currency: "gbp",
    cartId: cartId
    };
    
    // Disable the button until we have Stripe set up on the page
    fetch("https://shopping-cart-maryn.herokuapp.com/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
    })
    .then(function(result) {
      
        //console.log("This is result.json() " + result.json());
      return result.json();
    })
    .then(function(data) {
      return setupElements(data);
    })
    .then(function({ stripe, card, clientSecret }) {
      document.querySelector("button").disabled = false;
    
      // Handle form submission.
      var form = document.getElementById("payment-form");
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        // Initiate payment when the submit button is clicked
        pay(stripe, card, clientSecret);
      });
    });
    
    // Set up Stripe.js and Elements to use in checkout form
    var setupElements = function(data) {
    stripe = Stripe(data.publishableKey);
    //stripe = Stripe("pk_test_fJMqY2qUl2GKEsb4DPuvUrsE00Cu8SIepp")
    //console.log("This is publishable key: " + data.publishaleKey);
    var elements = stripe.elements();
    var style = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    
    var card = elements.create("card", { style: style });
    card.mount("#card-element");
    
    return {
      stripe: stripe,
      card: card,
      clientSecret: data.clientSecret
    };
    };
    
    /*
    * Calls stripe.confirmCardPayment which creates a pop-up modal to
    * prompt the user to enter extra authentication details without leaving your page
    */
    var pay = function(stripe, card, clientSecret) {
    changeLoadingState(true);
    
    // Initiate the payment.
    // If authentication is required, confirmCardPayment will automatically display a modal
    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: card
        }
      })
      .then(function(result) {
        if (result.error) {
          // Show error to your customer
          showError(result.error.message);
        } else {
          // The payment has been processed!
          orderComplete(clientSecret);
        }
      });
    };
    
    /* ------- Post-payment helpers ------- ----------------------------------------------------- SUCCESS PAYMENT*/ 
    
    /* Shows a success / error message when the payment is complete */
    var orderComplete = function(clientSecret) {
    // Just for the purpose of the sample, show the PaymentIntent response object
    stripe.retrievePaymentIntent(clientSecret).then(function(result) {
      var paymentIntent = result.paymentIntent;
      var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);
    
      document.querySelector(".sr-payment-form").classList.add("hidden");
      //document.querySelector("pre").textContent = paymentIntentJson;
      document.querySelector("pre").textContent = "Your payment was successful";
      
      document.querySelector(".display-success").insertAdjacentHTML('beforeend', '<div class="alert alert-success">' +
    '<strong>Congratulation!</strong> You successfully made the order.</div>');
    
      document.querySelector(".sr-result").classList.remove("hidden");
      setTimeout(function() {
        document.querySelector(".sr-result").classList.add("expand");
        window.location.href = '/remove-cart';
      }, 2000);
      
      changeLoadingState(false);
    });
    };
    
    var showError = function(errorMsgText) {
    changeLoadingState(false);
    var errorMsg = document.querySelector(".sr-field-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function() {
      errorMsg.textContent = "";
    }, 4000);
    };
    
    // Show a spinner on payment submission
    var changeLoadingState = function(isLoading) {
    if (isLoading) {
      document.querySelector("button").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("button").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
    };

  

    }   // end of document.getElementById("card-display") 
  //});   // end of document.addEventListener('DOMContentLoaded', function () 
}