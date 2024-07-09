function serialize(nums) {
    const encodeChar = (num) => {
        if (num < 26) return String.fromCharCode(65 + num); // A-Z
        if (num < 52) return String.fromCharCode(97 + num - 26); // a-z
        return String.fromCharCode(48 + num - 52); // 0-9
    };

    return nums.map(num => {
        const d1 = Math.floor(num / 10);
        const d0 = num % 10;
        return encodeChar(d1) + encodeChar(d0);
    }).join('');
}

function deserialize(str) {
    const decodeChar = (char) => {
        if (char >= 'A' && char <= 'Z') return char.charCodeAt(0) - 65;
        if (char >= 'a' && char <= 'z') return char.charCodeAt(0) - 97 + 26;
        return char.charCodeAt(0) - 48 + 52;
    };

    const nums = [];
    for (let i = 0; i < str.length; i += 2) {
        const d1 = decodeChar(str[i]);
        const d0 = decodeChar(str[i + 1]);
        nums.push(d1 * 10 + d0);
    }
    return nums;
}

// Тесты
const tests = [
    { input: [1, 2, 3], description: "простые числа" },
    { input: Array.from({ length: 50 }, () => Math.floor(Math.random() * 300) + 1), description: "случайные 50 чисел" },
    { input: Array.from({ length: 100 }, () => Math.floor(Math.random() * 300) + 1), description: "случайные 100 чисел" },
    { input: Array.from({ length: 500 }, () => Math.floor(Math.random() * 300) + 1), description: "случайные 500 чисел" },
    { input: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 300) + 1), description: "случайные 1000 чисел" },
    { input: Array(900).fill(1), description: "все числа 1 знака" },
    { input: Array(900).fill(99), description: "все числа из 2х знаков" },
    { input: Array(900).fill(299), description: "все числа из 3х знаков" },
    { input: Array.from({ length: 900 }, (_, i) => (i % 3) + 1), description: "каждого числа по 3 - всего чисел 900" },
];

tests.forEach(test => {
    const serialized = serialize(test.input);
    const deserialized = deserialize(serialized);
    const compressionRatio = (JSON.stringify(test.input).length / serialized.length).toFixed(2);

    console.log(`Тест: ${test.description}`);
    console.log(`Исходный массив: ${JSON.stringify(test.input)}`);
    console.log(`Сериализованная строка: ${serialized}`);
    console.log(`Десериализованный массив: ${JSON.stringify(deserialized)}`);
    console.log(`Коэффициент сжатия: ${compressionRatio}`);
    console.log('---');
});
