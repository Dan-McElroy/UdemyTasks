const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)
})

test('Should calculate total with default tip value', () => {
    const total = calculateTip(10)

    expect(total).toBe(12.5)
})

test('Should convert 32F to 0C', () => {
    expect(fahrenheitToCelsius(32)).toBe(0)
})

test('Should convert 0C to 32F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
})