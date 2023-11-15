let checkoutTotal = 0;

showCheckout = () => {
    let data = JSON.parse(localStorage.getItem("order"));
    let subsToDisplay = document.getElementById("subs-in-order");
    let totalHeading = document.getElementById("headingTotal");
    let totalBeforeDiscount = document.getElementById("discountedTotal");

    for(let i = 0; i < data.length; i++){
        let name = data[i].subName;
        let bread = data[i].breadType;
        let toppings = data[i].subToppings;
        let sauces = data[i].subSauces;
        let price = data[i].subPrice;

        checkoutTotal += price;

        subsToDisplay.innerHTML += `
        <div class="card col-6">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text"><strong>Bread:</strong> ${bread}</p>
                <p class="card-text"><strong>Toppings:</strong> ${toppings.join(", ")}</p>
                <p class="card-text"><strong>Sauces:</strong> ${sauces.join(", ")}</p>
                <h5>R${price}.00</h5>
            </div>
        </div>`
    }

    totalHeading.innerHTML = "Checkout: R" + checkoutTotal + ".00";
    totalBeforeDiscount.innerHTML = "R" + checkoutTotal + ".00";

}

let wrongCount = 0;
applyDiscount = () => {
    code = document.getElementById("discount").value;
    let discountPercent = 0;
    let discountAmount = 0;
    let newTotal = 0;

    

    if(code !== "friyaya" && code !== "Where did you find this awesome code?"){
        wrongCount++;
        if(wrongCount >= 4){
            document.getElementById("discount").disabled = true;
            document.getElementById("discountButton").disabled = true;
            alert("You're just trying to be sneaky...")
        }else{
            alert("Invalid Discount Code")
        }
    }else{
        discountPercent = code === "friyaya" ? 0.15 : 0.75;
        discountAmount = (checkoutTotal * discountPercent).toFixed(2);
        newTotal = (checkoutTotal - discountAmount).toFixed(2);

        let discountTextfield = document.getElementById("discountTextFieldID");
        discountTextfield.innerHTML = "Success, discount code applied!"

        let preDis = document.getElementById("totalCheckoutCost");
        preDis.innerHTML = "R" + checkoutTotal + ".00";

        let disAmount = document.getElementById("totalCheckoutCostDiscount");
        disAmount.innerHTML = "-R" + discountAmount;


        let totalHeading = document.getElementById("headingTotal");
        let totalAfterDiscount = document.getElementById("discountedTotal");
        totalHeading.innerHTML = "Checkout: R" + newTotal;
        totalAfterDiscount.innerHTML = "R" + newTotal;

        document.getElementById("discount").disabled = true;
    }

    
}

resetAndReturn = () => {
    localStorage.removeItem("order");
    window.location.href = "../index.html";
}