export const calculateProductPrice = (priceCents) => {
    let price = (priceCents / 100).toFixed(2)

    return price
}