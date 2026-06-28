import {sum, capitalise, reverse_string, calculator, ceasar_cipher, analyse} from './main.js'

test("Add 1 and 2 to 3",()=>{
    expect(sum(1,2)).toBe(3);
})

test("First character capitalised",()=>{
    expect(capitalise('breakfast')).toBe('Breakfast')
})

test("Character reversed",()=>{
    expect(reverse_string('breakfast')).toBe('tsafkaerb')
})

test("Calculates multiplications",()=>{
    expect(calculator("multiply", 4,3)).toBe(12)
})

test("Cipher returns correctly shifted string",()=>{
    expect(ceasar_cipher("abbacus",1)).toBe("bccbdvt");
    expect(ceasar_cipher("abbacus",3)).toBe("deedfxv");
    expect(ceasar_cipher("1.abbacus 2.WoW! ",1)).toBe("2.bccbdvt 3.XpX! ");
})


test("Analyses list correctly",()=>{
    expect(analyse([1,1,1,3,4])).toStrictEqual(object={
        average:2,
        min:1,
        max:4,
        length:5
    } )
})