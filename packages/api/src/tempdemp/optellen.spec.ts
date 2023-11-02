const sum = (a: number, b: number) => {
    return Math.abs(a + b)
}

describe('optellen logica', () => {
    it('should add 1 + 2 to equal 3', () => {
        expect(sum).toBeDefined()
    })

    it('should add 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('should return a negative number when adding a negative number', () => {
        expect(sum(-1, -2)).toBe(-3);
    });
});