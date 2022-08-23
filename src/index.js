//////////variable//////////
// let data = require('./data-base.js')
import { products } from "./data-base.js";
//////////variable-end//////////

//////////cart list//////////
let cartList = [];
let repeatCartList = [];
let listCartItems = [];
let listPrice = [];
let totalForPay;
//////////cart list-end//////////


//////////top offer//////////
let topOfferIndex = [1, 5, 15, 3, 6, 10, 11]
makeCardsProduct(topOfferIndex, "normal", "#top-offer", ".scroll-part");
//////////top offer-end//////////


//////////all products//////////
let allProducts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
makeCardsProduct(allProducts, "normal", "#all-product");
//////////all products-end//////////


//////////refresh//////////
function refreshDetail() {
    //////////add & remove cart btn//////////
    Array.from(document.querySelectorAll('.add-product')).forEach((addBtn) => {
        addBtn.addEventListener('click', checkAddRemove)
    })

    Array.from(document.querySelectorAll('.remove-product')).forEach((addBtn) => {
        addBtn.addEventListener('click', checkAddRemove)
    })
    //////////add & remove cart btn-end//////////

    //////////cart icon counter//////////
    let cartCounter = document.getElementById('cart-num');
    cartCounter.setAttribute("cart-num-content", `${cartList.length + repeatCartList.length}`);
    //////////cart icon counter-end//////////

    //////////list cart items//////////
    listCartItems = cartList.concat(repeatCartList)
    totalPrice(listCartItems)
    //////////list cart items-end//////////

    //////////empty cart//////////
    let emptyCart = '<div id="empty-cart" class="d-flex justify-content-center align-items-center w-100 h-100 text-secondary">سبد خرید شما خالی است</div>'
    if (cartList.length == 0) document.querySelector('#cart-list').innerHTML = emptyCart
    //////////empty cart-end//////////

    //////////not offer//////////
    Array.from(document.querySelectorAll('.point-number')).forEach((text) => {
        if (text.className.includes('text-danger') && text.nextElementSibling.innerHTML == "") {
            text.style.textDecoration = "none"
            text.classList.remove('text-danger')
            text.classList.remove('d-block')
            text.classList.add('text-success')
        }
    })
    //////////not offer-end//////////

    //////////point number//////////
    Array.from(document.querySelectorAll(".point-number")).forEach((numTag) => {
        numTag.innerHTML = pointNumber(numTag.innerHTML)
    })
    //////////point number-end//////////
}
//////////refresh-end//////////


//////////point number//////////
function pointNumber(valueNumber) {
    let value = valueNumber
    let refreshValue = value.split('.').join('').split('')
    let dotePlace = []
    let finalValue
    for (let i = 1; i < refreshValue.length; i++) {
        i % 3 == 0 ? dotePlace.push(i + dotePlace.length) : null;
    }
    for (let z = 0; z < dotePlace.length; z++) {
        refreshValue.splice(refreshValue.length - (dotePlace[z]), 0, `.`)
    }
    finalValue = refreshValue.join('')
    return finalValue || value
}
//////////point number-end//////////


//////////make card-end//////////
function makeCardsProduct(productList, cardModel, targetIdDoc, targetChild = null) {
    let targetElemment = document.querySelector(`${targetIdDoc}`);
    let targetIdDoc_noSharp = targetIdDoc.split('#')[1];
    clearCardList(targetIdDoc, targetChild)
    productList.forEach((productIndex) => {
        let productData = products[productIndex];
        let productCard = document.createElement('div');
        ////cart detail////
        let cartNumber = cartList.indexOf(productIndex) + 1 || 0;
        let cartCount = repeatCartCount(productIndex) || 0;
        ////cart detail-end////

        if (cardModel == "normal") {
            productCard.className = "card shadow";
            productCard.innerHTML = `
            <div class="card-header">
                <div class="nav nav-tabs card-header-tabs" id="" role="tablist">
                    <button type="button" class="nav-link active" data-toggle="tab" data-target="${targetIdDoc}-${productData.proId}-pro"
                        aria-controls="product" aria-selected="true">
                        محصول
                    </button>
                    <button type="button" class="nav-link" data-toggle="tab" data-target="${targetIdDoc}-${productData.proId}-com"
                        aria-controls="comments" aria-selected="true">
                        نظرات
                    </button>
                </div>
            </div>
            <div class="card-body mt-2">
                <div class="tab-content">
                    <div class="nav-pane position-relative fade show active" id="${targetIdDoc_noSharp}-${productData.proId}-pro" role="tabpanel"
                        aria-labelledby="product-tab">
                        <img class="card-img" src="${productData.imgURL}" alt="">
                        <div class="card-title">${productData.title}</div>
                        <div class="card-text">
                            <span class="text-danger point-number d-block"
                                style="text-decoration: line-through solid 1.5px;">${productData.price}</span>
                            <span class="text-success point-number">${productData.priceOff}</span>
                            <span> تومان </span>
                        </div>
                        <button type="button" proid="${productData.proId}"
                            class="btn btn-success rounded-pill position-absolute d-flex justify-content-center align-items-center add-product">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>
                    </div>
                    <div class="px-2 nav-pane fade" id="${targetIdDoc_noSharp}-${productData.proId}-com" role="tabpanel"
                        aria-labelledby="comments-tab">
                        <div class="media mt-2">
                            <i class="fa-solid fa-circle-user d-inline" style="font-size: x-large;"></i>
                            <div class="media-body text-justify mr-1">لورم ایپسوم متن ساختگی با تولید سادگی
                                نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</div>
                        </div>
                        <div class="media mt-2">
                            <i class="fa-solid fa-circle-user d-inline" style="font-size: x-large;"></i>
                            <div class="media-body text-justify mr-1">لورم ایپسوم متن ساختگی با تولید سادگی
                                نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</div>
                        </div>
                        <div class="media mt-2">
                            <i class="fa-solid fa-circle-user d-inline" style="font-size: x-large;"></i>
                            <div class="media-body text-justify mr-1">لورم ایپسوم متن ساختگی با تولید سادگی
                                نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</div>
                        </div>
                        <div class="media mt-2">
                            <i class="fa-solid fa-circle-user d-inline" style="font-size: x-large;"></i>
                            <div class="media-body text-justify mr-1">لورم ایپسوم متن ساختگی با تولید سادگی
                                نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</div>
                        </div>
                        <div class="media mt-2">
                            <i class="fa-solid fa-circle-user d-inline" style="font-size: x-large;"></i>
                            <div class="media-body text-justify mr-1">لورم ایپسوم متن ساختگی با تولید سادگی
                                نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</div>
                        </div>
                    </div>
                </div>
            </div>    
            `
        }
        if (cardModel == "cart") {
            productCard.className = "card no-gutters shadow border-0";
            productCard.innerHTML = `
            <div class="col-1 d-flex justify-content-center align-items-center">
                ${cartNumber}
            </div>
            <div class="col-2 d-flex justify-content-center align-items-center">
                <img src="${productData.imgURL}" alt="">
            </div>
            <div class="col-6 d-flex justify-content-center align-items-center">
                <div class="card-body">
                    <div class="card-title">${productData.title}</div>
                    <div class="card-text">
                        <span class="text-danger point-number d-block"
                            style="text-decoration: line-through solid 1.5px; font-size: 0.7rem;">${productData.price}</span>
                        <span class="text-success point-number"
                            style="font-size: 0.7rem;">${productData.priceOff}</span>
                        <span style="font-size: 0.7rem;"> تومان </span>
                    </div>
                </div>
            </div>
            <div class="col-3 d-flex justify-content-center align-items-center">
                <button type="button" proid="${productData.proId}" class="btn btn-outline-danger btn-sm add-product"
                    style="font-weight: bolder;">&plus;</button>
                <span class="mx-2">${cartCount}</span>
                <button type="button" proid="${productData.proId}" class="btn btn-outline-danger btn-sm remove-product"
                    style="font-weight: bolder;">&minus;</button>
            </div>
            `
        }
        if (targetChild) {
            targetElemment.querySelector(`${targetChild}`).appendChild(productCard)
        } else if (!targetChild) {
            targetElemment.appendChild(productCard)
        }
    })
}
//////////make card-end//////////


//////////make repeat cart Count//////////
function repeatCartCount(productIndex) {
    let hasRepeatIndex = repeatCartList.filter(index => index == productIndex);
    if (hasRepeatIndex.length > 0) return hasRepeatIndex.length + 1;
    else return 1;
}
//////////make repeat cart Count-end//////////


//////////add & remove on cart//////////
function checkAddRemove(e) {
    let myElement;
    let myClassName;
    if (e.target.className.includes('add-product') || e.target.className.includes('remove-product')) {
        myElement = e.target;
        myClassName = e.target.className;
    }
    if (e.target.parentElement.className.includes('add-product') || e.target.parentElement.className.includes('remove-product')) {
        myElement = e.target.parentElement;
        myClassName = e.target.parentElement.className;
    }
    addRemoveCart(myElement, myClassName);
}

function addRemoveCart(myElement, myClassName) {
    let proId = myElement.attributes.proid.value;
    let proIndex
    if (myClassName.includes("add-product")) {
        let product = products.filter((pro, index) => { if (pro.proId == proId) proIndex = index });
        let repeatCart = cartList.filter(index => index == proIndex);
        if (repeatCart.length > 0) repeatCartList.push(proIndex);
        else cartList.push(proIndex);
    }
    if (myClassName.includes("remove-product")) {
        let product = products.filter((pro, index) => { if (pro.proId == proId) proIndex = index });
        let repeatCart = repeatCartList.filter(index => index == proIndex);
        if (repeatCart.length > 0) repeatCartList.splice(repeatCartList.lastIndexOf(proIndex), 1);
        else cartList.splice(cartList.indexOf(proIndex), 1);
    }

    clearCardList("#cart-list");
    makeCardsProduct(cartList, "cart", "#cart-list");
    refreshDetail();
}
//////////add & remove on cart-end//////////


//////////clear card list//////////
function clearCardList(targetIdDoc, targetChild = null) {
    let targetElemment = document.querySelector(`${targetIdDoc}`)
    if (targetChild) {
        (targetElemment.querySelector(`${targetChild}`).childNodes.forEach((a =>
            targetElemment.querySelector(`${targetChild}`).removeChild(a))))
    } else if (!targetChild) {
        (targetElemment.childNodes.forEach((a => targetElemment.removeChild(a))))
    }
}
//////////clear card list-end//////////


//////////counter total price//////////
function totalPrice(listCartItems) {
    listPrice.length = 0;
    listCartItems.forEach(indexValue => {
        listPrice.push(parseInt(products[indexValue].priceOff) || parseInt(products[indexValue].price))
    });
    totalForPay = listPrice.reduce((a, b) => a + b, 0);
    document.querySelector('#cart-total-price').innerHTML = totalForPay;
}
//////////counter total price-end//////////


//////////show cart//////////
function cartShow(e) {
    e.target.classList.toggle('text-danger');
    e.target.classList.toggle('text-secondary');
    document.querySelector('#cart').classList.toggle('hamburger-down');
    document.querySelector('#cart').classList.toggle('hamburger-up');
}

let moveTochHandler = []

function ChangeCartHeight(touchPos) {
    moveTochHandler.push(touchPos)
    document.getElementById('cart').style.height = document.getElementById('cart').offsetHeight + "px";
    let touchPosDistance = moveTochHandler[moveTochHandler.length - 1] - moveTochHandler[moveTochHandler.length - 2]
    let dis = parseInt(document.getElementById('cart').style.height.split('px')[0]) - touchPosDistance
    if (moveTochHandler.length > 2 && document.getElementById('cart').offsetTop > innerHeight * 0.4) {
        document.getElementById('cart').style.height = dis + "px"
    } else if (moveTochHandler.length > 2 && document.getElementById('cart').offsetTop <= innerHeight * 0.40) {
        document.getElementById('cart').style.height = (innerHeight * 0.60) - 2 + "px"
    }
    if (document.getElementById('cart').offsetTop >= innerHeight * 0.90 || touchPosDistance > 15) {
        document.querySelector('.fa-cart-shopping').classList.toggle('text-danger');
        document.querySelector('.fa-cart-shopping').classList.toggle('text-secondary');
        document.querySelector('#cart').classList.toggle('hamburger-down');
        document.querySelector('#cart').classList.toggle('hamburger-up');
    }
    if (moveTochHandler.length > 3) moveTochHandler.shift()
}

document.querySelector('.fa-cart-shopping').addEventListener('click', cartShow)

document.getElementById('cart-handler').addEventListener('touchmove', (e) => {
    e.preventDefault()
    let touchPos = e.changedTouches.item(0).clientY;
    ChangeCartHeight(touchPos)
})

document.getElementById('cart-handler').addEventListener('touchend', () => {
    moveTochHandler = []
})

document.querySelector('#cart').addEventListener('animationend', (e) => {
    e.target.style.height = "max-content"
})
//////////show cart-end//////////

refreshDetail()