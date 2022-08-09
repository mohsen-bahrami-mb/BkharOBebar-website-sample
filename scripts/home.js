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
// addEventListener('sele')

//////////input point number//////////
let piontNumbers = Array.from(document.querySelectorAll(".point-number")).forEach((numTag) => {
    numTag.innerHTML = pointNumber(numTag.innerHTML)
})
//////////input point number-end//////////