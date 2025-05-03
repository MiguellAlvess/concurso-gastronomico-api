export function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return false
    }

    const digits = cnpj.split('').map(Number)
    const calcDigit = (slice) => {
        const weights =
            slice === 0
                ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
                : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const sum = digits
            .slice(0, 12 + slice)
            .reduce((acc, curr, i) => acc + curr * weights[i], 0)
        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    return digits[12] === calcDigit(0) && digits[13] === calcDigit(1)
}
