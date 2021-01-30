const calculateTip = (total, tipPercent = .25) => {
    const tip = total * tipPercent
    return total + tip
}

module.exports = { calculateTip }