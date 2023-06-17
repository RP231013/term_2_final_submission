viewIngred = (idImg, checkBx) => {

    let img = document.getElementById(idImg);
    let check = document.getElementById(checkBx);

    if(check.checked){
        img.style.visibility = "visible";
    } else{
        img.style.visibility = "hidden";
    }
    
}


breadChange = (idImg) => {

    let img = document.getElementById(idImg);
    let img2 = document.getElementById("br-btm");

    let breadOptions = document.getElementsByName("breadRadios");
    let breadType;
    for(let i = 0; i < breadOptions.length; i++){
        if(breadOptions[i].checked){
            breadType = breadOptions[i].value;
        }
    }

    if(breadType == "White Bread"){
        img.style.filter = "hue-rotate(0deg)";
        img2.style.filter = "hue-rotate(0deg)";
    }else if(breadType == "Rye Bread"){
        img.style.filter = "hue-rotate(13deg)";
        img2.style.filter = "hue-rotate(13deg)";
    }else if (breadType == "Ciabatta Bread"){
        img.style.filter = "sepia(100%)";
        img2.style.filter = "sepia(100%)";
    }
    
}

let subOrder = [];

makeSub = () => {

    let subTotal = 0;

    let subName = document.getElementById("subName").value;
    
    let breadOptions = document.getElementsByName("breadRadios");
    let breadType;
    for(let i = 0; i < breadOptions.length; i++){
        if(breadOptions[i].checked){
            breadType = breadOptions[i].value;
            subTotal += +breadOptions[i].dataset.cost;
        }
    }

    let topOptions = document.getElementsByName("tops");
    toppingsArr = [];
    for(let i = 0; i < topOptions.length; i++){
        if(topOptions[i].checked){
            toppingsArr.push(topOptions[i].value);
            subTotal += +topOptions[i].dataset.cost;
        }
    }

    let sauceOpts = document.getElementsByName("sauce");
    sauceArr = [];
    for(let i = 0; i < sauceOpts.length; i++){
        if(sauceOpts[i].checked){
            sauceArr.push(sauceOpts[i].value);
            subTotal += +sauceOpts[i].dataset.cost;
        }
    }

    subOrder.push({
        subName: subName,
        breadType: breadType,
        subToppings: toppingsArr,
        subSauces: sauceArr,
        subPrice: subTotal
    });


    document.getElementById("sub-price").innerHTML = "R0.00"
    //resets form
    document.getElementById("subBuilder").reset();

    //resets disabled buttons
    let btn = document.getElementById("buildNewSubBtn");
    btn.disabled = true;
    
    //resets ingredient images
    let imgArr = document.getElementsByClassName("img-vis");
    for(let i = 0; i < imgArr.length; i++){
        imgArr[i].style.visibility = "hidden";
    }

    //resets bread colour
    let img = document.getElementById("br-top");
    let img2 = document.getElementById("br-btm");
    img.style.filter = "hue-rotate(0deg)";
    img2.style.filter = "hue-rotate(0deg)";

}

totalInRealTime = () => {

    let subTotal = 0;
    
    let breadOptions = document.getElementsByName("breadRadios");
    for(let i = 0; i < breadOptions.length; i++){
        if(breadOptions[i].checked){
            subTotal += +breadOptions[i].dataset.cost;
        }
    }

    let topOptions = document.getElementsByName("tops");
    for(let i = 0; i < topOptions.length; i++){
        if(topOptions[i].checked){
            subTotal += +topOptions[i].dataset.cost;
        }
    }

    let sauceOpts = document.getElementsByName("sauce");
    for(let i = 0; i < sauceOpts.length; i++){
        if(sauceOpts[i].checked){
            subTotal += +sauceOpts[i].dataset.cost;
        }
    }

    document.getElementById("sub-price").innerHTML = "R" + subTotal + ".00"

}

showOrders = () => {
    let output = document.getElementById("current-orders");
    let total = document.getElementById("order-total");

    output.innerHTML = "";
    let overallTotal = 0;

    for(let i = 0; i < subOrder.length; i++){
        let name = subOrder[i].subName;
        let bread = subOrder[i].breadType;
        let toppings = subOrder[i].subToppings;
        let sauces = subOrder[i].subSauces;
        let cost = subOrder[i].subPrice;

        overallTotal += cost;

        output.innerHTML += `
        <div>
                              
        <div class="card" style="width: 18rem; margin: 20px;">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text"><strong>Bread:</strong> ${bread}</p>
            <p class="card-text"><strong>Toppings:</strong> ${toppings.join(", ")}</p>
            <p class="card-text"><strong>Sauces:</strong> ${sauces.join(", ")}</p>
            <h5>R${cost}.00</h5>
          </div>
        </div>

      </div>
        `;

        total.innerHTML = "Total Order Cost R" + overallTotal + ".00";
    }
}

enoughIngreds = () => {

    let topOptions = document.getElementsByName("tops");
    toppingsArr = [];
    for(let i = 0; i < topOptions.length; i++){
        if(topOptions[i].checked){
            toppingsArr.push(topOptions[i].value);
        }
    }

    let sauceOpts = document.getElementsByName("sauce");
    sauceArr = [];
    for(let i = 0; i < sauceOpts.length; i++){
        if(sauceOpts[i].checked){
            sauceArr.push(sauceOpts[i].value);
        }
    }
    
    let btn2 = document.getElementById("checkoutBtn");
    let btn = document.getElementById("buildNewSubBtn");
    let par = document.getElementById("selectionMin");

    if(toppingsArr.length >= 5 && sauceArr.length >= 1){
        btn.disabled = false;
        par.style.visibility = "hidden";
    }else{
        btn.disabled = true;
        btn2.disabled = true;
        par.style.visibility = "visible";
    }

    if(subOrder.length >= 1){
        btn2.disabled = false;
    }

}

checkOut = () => {
    let subOrderData = JSON.stringify(subOrder);
    localStorage.setItem("order", subOrderData);
    window.location.href = "checkout.html";
}
