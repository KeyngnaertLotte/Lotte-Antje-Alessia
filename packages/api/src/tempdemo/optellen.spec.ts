const sum = (a: number, b: number) =>{
    return a + b;
};

describe('optellen logica', () => {
    
    it('should be defined', () => {
        expect(sum).toBeDefined();
    });

    it('should return 3', () => {
        expect(sum(1,2)).toBe(3);
    });

    it ('should return negative number', () => {
        expect(sum(-1,-2)).toBe(-3);
    }
    );
});