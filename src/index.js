//////////variable//////////
// let data = require('./data-base.js')
import { products } from "./data-base.js";
//////////variable-end//////////


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


//////////top offer//////////
let topOfferIndex = [1, 5, 15, 3, 6, 10, 11]
function MakeCardsProduct(productList, targetIdDoc) {
    let targetElemment = document.querySelector(`#${targetIdDoc}`)
    productList.forEach((productIndex) => {
        let productData = products[productIndex];
        let productCard = document.createElement('div');
        productCard.className = "card shadow";
        productCard.innerHTML = `
        <div class="card-header">
            <div class="nav nav-tabs card-header-tabs" id="" role="tablist">
                <button type="button" class="nav-link active" data-toggle="tab" data-target="#t-o-${productData.proId}-pro"
                    aria-controls="product" aria-selected="true">
                    محصول
                </button>
                <button type="button" class="nav-link" data-toggle="tab" data-target="#t-o-${productData.proId}-com"
                    aria-controls="comments" aria-selected="true">
                    نظرات
                </button>
            </div>
        </div>
        <div class="card-body mt-2">
            <div class="tab-content">
                <div class="nav-pane position-relative fade show active" id="t-o-${productData.proId}-pro" role="tabpanel"
                    aria-labelledby="product-tab">
                    <img class="card-img" src="${productData.imgURL}" alt="">
                    <div class="card-title">${productData.title}</div>
                    <div class="card-text">
                        <span class="text-danger point-number d-block"
                            style="text-decoration: line-through solid 1.5px;">${productData.price}</span>
                        <span class="text-success point-number">${productData.priceOff}</span>
                        <span> تومان </span>
                    </div>
                    <button type="button"
                        class="btn btn-success rounded-pill position-absolute d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
                <div class="px-2 nav-pane fade" id="t-o-${productData.proId}-com" role="tabpanel"
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
        targetElemment.querySelector('.scroll-part').appendChild(productCard)
    })
}
MakeCardsProduct(topOfferIndex, "top-offer");
//////////top offer-end//////////


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


//////////input point number//////////
Array.from(document.querySelectorAll(".point-number")).forEach((numTag) => {
    numTag.innerHTML = pointNumber(numTag.innerHTML)
})
//////////input point number-end//////////