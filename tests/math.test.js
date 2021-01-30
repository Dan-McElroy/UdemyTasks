const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

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

test('Async test demo', (complete) => {
    setTimeout(() => {
        expect(1).toBe(1)
        complete()
    }, 2000)
})

test('Should add two numbers', (complete) => {
    add(2, 3).then(sum => {
        expect(sum).toBe(5)
        complete()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(10, 22)
    expect(sum).toBe(32)
})