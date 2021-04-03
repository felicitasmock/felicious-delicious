
//ShoopingBasket on fixed position while scrolling

window.onscroll = function () {
    let shoppingBasket = document.getElementById('shoppingBasket');
    let menubar = document.getElementById('headerMenu');

    if (window.scrollY > 100) {
        shoppingBasket.style.top = "0";
        menubar.style.top = "0";
    } else {
        shoppingBasket.style.top = "100px";
        menubar.style.top = "400px";
    }
};


// Array for food

let food = [{
    'name': 'Bruschette',
    'idname': 'Bruschette',
    'detail': 'Leckeres italienisches Brot mit Tomaten-Bruschetta',
    'amount': 1,
    'price': 5.00
}, {
    'name': 'Anti-Pasti',
    'detail': 'Oliven, Taralle, Salami, Parma-Schinken & gegrilltes Gemüse ',
    'amount': 1,
    'price': 7.80
}, {
    'name': 'Pizza Margherita',
    'detail': 'Klassisch',
    'amount': 1,
    'price': 6.00
}, {
    'name': 'Pizza Funghi',
    'detail': 'Mit frischen Champignons',
    'amount': 1,
    'price': 10.50
}, {
    'name': 'Pizza Puglia',
    'idname': 'PizzaPuglia',
    'detail': 'Mit Karpern und Sardellen',
    'amount': 1,
    'price': 12.50
}, {
    'name': 'Pizza Salami',
    'detail': 'Mit Salami',
    'amount': 1,
    'price': 8.50
}, {
    'name': 'Pizza Parma',
    'detail': 'Mit Parmaschinken und Rucola',
    'amount': 1,
    'price': 13.50
}, {
    'name': 'Penne Napoli',
    'detail': 'Penne mit Tomatensoße',
    'amount': 1,
    'price': 5.20
}, {
    'name': 'Spaghetti Bolognese',
    'detail': 'Spaghetti mit feiner Hackfleischsoße',
    'amount': 1,
    'price': 7.50
}, {
    'name': 'Penne Bosciaola',
    'detail': 'Mit frischen Champignons, Erbsen und Schinken',
    'amount': 1,
    'price': 6.50
}, {
    'name': 'Penne Tonno',
    'idname': 'PenneTonno',
    'detail': 'Mit Karpern und frischem Thunfisch',
    'amount': 1,
    'price': 10.50
}];




// defines text if shoppingCard is empty
let basketDefault = `
    <div id="basketDefault">
    <div class="basket-img-container">
        <img src="img/icons/shopping-basket-48.png">
    </div>
    <div class="shopping-basket-text">Wähle leckere Gerichte aus der Karte aus und bestelle dein Menü.
    </div>
    </div>
`;

// // Loads Shoppingcard from local storage
// function loadShoppingCard() {
//     shoppingCard = getArray('item'); //array aufrufen
// }

// Fill meals Starter container
function loadMeals() {
    shoppingCard = getArray('item'); //array aus local stoarage aufrufen

    for (let i = 0; i < food.length; i++) {
        //defines favorite meals
        document.getElementById('favMeals').innerHTML = `
        <div class="fav-meals-wrapper">
            <a href="#${food[0]['idname']}">Bruschette</a>
            <a href="#${food[4]['idname']}">Pizza Puglia</a>
            <a href="#${food[10]['idname']}">Penne Tonno</a>
        </div>
        `;
        //fill meals and calls calculate price
        document.getElementById('starter').innerHTML += `
            <div class="meals-container">
                        <div class="meals">
                            <div class="meal-wrapper">
                                <div id=${food[i]['idname']} class="font-bold">${food[i]['name']}</div>
                                <div class="meal-description">${food[i]['detail']}</div>
                                <div class="meal-price font-orange font-bold">${food[i]['price'].toFixed(2)}&nbsp;€</div>
                            </div>
                        <div onclick="openMealStarter(${i}), returnPriceStarter(${i})" id="openCloseStarter${i}" class="meal-open">+</div> 
                    </div>
                    <div class="d-none" id="mealDetailStarter${i}"></div>
            </div>
            `;
    }
}

//Meals Starter - open gray Box
function openMealStarter(i) {
    document.getElementById(`mealDetailStarter${i}`).innerHTML = `
        <div class="meal-details-open">
            <div class="hide-mobile meal-name-wrapper" id="mealName${i}">${food[i]['name']}</div> 
                <div class="amount-wrapper">
                    <button onClick="lessStarter(${i}), returnPriceStarter(${i})" class="less-amount-btn">-</button>
                    <div id="amountStarter${i}" class="amount-input">${food[i]['amount']}</div>
                    <button onclick="moreStarter(${i}), returnPriceStarter(${i})" class="more-amount-btn">+</button>
                </div>
            <div onClick="fillShoppingBasket(${i})"  class="pick-btn"><span id="mealPriceStarter${i}">${food[i]['price'].toFixed(2)}</span>&nbsp;€</div>
        </div>`;

    let isHidden = document.getElementById(`mealDetailStarter${i}`).classList.contains('d-none');
    document.getElementById(`mealDetailStarter${i}`).classList.toggle('d-none');
    document.getElementById(`openCloseStarter${i}`).innerHTML = isHidden ? `-` : `+`;

}




//count down Starter

function lessStarter(i) {
    let num = document.getElementById(`amountStarter${i}`).innerHTML;
    num--; // count down
    if (num <= 1) { // no value under 0
        num = 1;
    }

    document.getElementById(`amountStarter${i}`).innerHTML = num; // put number of count in field

    // updates the amount in the array, so that with open/close openMeal (+/-) the changed amount is still shown
    food[i]['amount'] = num;

}

//count up Starter
function moreStarter(i) {
    let num = document.getElementById(`amountStarter${i}`).innerHTML;
    num++; // count down

    document.getElementById(`amountStarter${i}`).innerHTML = num; // put number of count in field
    
    // updates the amount in the array, so that with open/close openMeal (+/-) the changed amount is still shown
    food[i]['amount'] = num;

}



// calculate price of item for starters 
// function is also called in open Meals
function returnPriceStarter(i) {
    let price = food[i]['price'];
    let amount = +document.getElementById(`amountStarter${i}`).innerHTML;
    let result = price * amount;
    document.getElementById(`mealPriceStarter${i}`).innerHTML = `${result.toFixed(2)}`;

}



// start shopping basket


// Array for mealName and prices and amount

let shoppingCard = [];

// loads shoppingcard 
function loadShoppingCard() {
    if (shoppingCard == '') { //if array shoppingcard is empty
        document.getElementById('order').innerHTML = basketDefault; //show defaulttext
    } else {
        updateShoppingBasket(); // else show items in shoppingsbasket   
    }
}


// fill shopping basket with name, amount and price
function fillShoppingBasket(i) {

    let item = {
        //sets array
        'name': document.getElementById(`mealName${i}`).innerHTML,
        'price': food[i]['price'],
        'amount': +document.getElementById(`amountStarter${i}`).innerHTML,
    };
    let itemInShoppingCard = shoppingCard.find(function (e) { //function to find if name already exists
        return e.name == item.name;
    });
    if (itemInShoppingCard) {//if name in shoppingCard
        itemInShoppingCard.amount = item.amount; //use amount of array
        itemInShoppingCard.price = item.price; // use prices of array
        updateShoppingBasket();
    } else {
        //fills array
        shoppingCard.push(item);
    }
    setArray('item', shoppingCard);  // sets array in local storage

    updateShoppingBasket(); // calls updateShoppingBasket to fill order   
}

function updateShoppingBasket() {
    document.getElementById('order').innerHTML = '';
    for (let i = 0; i < shoppingCard.length; i++) {
        let finalprice = shoppingCard[i]['price'] * shoppingCard[i]['amount'];
        document.getElementById('order').innerHTML += ` 
        <div class="basket-order-row">
            <div class="basket-order-meal-name">${shoppingCard[i]['amount']} x ${shoppingCard[i]['name']}</div>
            <div class="plusminus-wrapper"><div class="plusminus" onclick="decrease(${i})">-</div><div class="plusminus" onClick="increase(${i})">+</div></div>
            <div class="basket-order-price">
                <div>${finalprice.toFixed(2)}&nbsp;€</div>
                <img src="img/icons/delete-16.png" onclick="deleteItem(${i})">
            </div>
        </div>
        `;
    }
    interSum();
    totalSum();
    checkInterSum()

}

// intersum of shopping basket
function interSum() {
    let isum = 0;
    for (let i = 0; i < shoppingCard.length; i++) {
        isum += shoppingCard[i]['price'] * shoppingCard[i]['amount'];
    }
    document.getElementById('interSum').innerHTML = isum.toFixed(2);
    document.getElementById('totalPriceMobile').innerHTML = isum.toFixed(2);
}

// sum up total price of shopping basket

function totalSum() {
    let intersum = +document.getElementById('interSum').innerHTML;
    let deliveryCosts = +document.getElementById('deliveryCosts').innerHTML;
    let totalSum = intersum + deliveryCosts;
    document.getElementById('totalPrice').innerHTML = totalSum.toFixed(2);

}

// checker if sum > min sum of order
function checkInterSum() {
    let sum = document.getElementById('interSum').innerHTML;
    let disabled = document.getElementById('orderBtn');
    if (sum >= 10) {
        document.getElementById('minOrderText').classList.add('d-none'); //don't show min order text
        disabled.classList.remove('disabled'); // enable button to order   
    } else {
        document.getElementById('minOrderText').classList.remove('d-none'); // show min order text
        disabled.classList.add('disabled'); // disable button
    }
    document.getElementById('deliveryRow').classList.remove('d-none'); //removes class d-none 
    document.getElementById('deliveryRow').classList.add('price-summary');// adds class to show delivery costs
    document.getElementById('deliveryCosts').innerHTML = 2.5.toFixed(2); // sets delivery costs to 2.5€ and shows delivery costs 
}


// deletes position of item in shoppingcard
function deleteItem(position) {
    shoppingCard.splice(position, 1);
    setArray('item', shoppingCard); // updates array in local storage
    updateShoppingBasket();
    if (shoppingCard == '') { // if shoppingcard is empty
        document.getElementById('order').innerHTML = basketDefault; // show default text
        document.getElementById('deliveryCosts').innerHTML = 0;
        document.getElementById('deliveryRow').classList.add('d-none');
        document.getElementById('deliveryRow').classList.remove('price-summary');
    }
    totalSum();

}

//countup amount in shopping basket
function increase(i) {
    shoppingCard[i]['amount']++; //count up amount of array
    setArray('item', shoppingCard); // updates array in local storage
    updateShoppingBasket();
}

//count down amount in shopping basket
function decrease(i) {
    shoppingCard[i]['amount']--;
    updateShoppingBasket(); //updates shoppingbasket so that less amount is shown - must be called before delete function, otherwise default text is not shown
    if (shoppingCard[i]['amount'] == 0) { //if shoppingCard amount is 0

        deleteItem(i); // call function delete item
    }
    setArray('item', shoppingCard); // updates array in local storage

}



function orderMeals() {

    let basketContainer = document.getElementById('innerShoppingBasket');
    // sets layer above shopping-basket-box
    basketContainer.innerHTML += `
        <div class="order-sent">
            <div class="basket-after-order">
            <div class="headline-basket-after">Bestellung erfolgreich</div>
            <div> Vielen Dank für Ihre Bestellung bei Casa di Puglia.</div>
        </div>
        `;

    shoppingCard = []; // empties Array after meals have been ordered
    deleteItem();

}


function openBasketMobile() {
    document.getElementsByTagName("body")[0].classList.add("noscroll"); //damit der Body nicht scrollt im Hintergrund
    document.getElementById('shoppingBasket').classList.remove('hide-mobile');
}
function closeBasketMobile() {
    document.getElementsByTagName("body")[0].classList.remove("noscroll"); //damit der Body nicht scrollt im Hintergrund
    document.getElementById('shoppingBasket').classList.add('hide-mobile');

}


// local storage

function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
    // gibt mir das was im local storage steht, ODER (||) gibt mir nichts ([])