import { HashMap} from './hashmap.js'


describe('Hash map test', ()=>{

    let map;

    beforeEach(()=>{
        map = new HashMap();

        map.set('apple', 'red')
        map.set('banana', 'yellow')
        map.set('carrot', 'orange')
        map.set('dog', 'brown')
        map.set('elephant', 'gray')
        map.set('frog', 'green')
        map.set('grape', 'purple')
        map.set('hat', 'black')
        map.set('ice cream', 'white')
        map.set('jacket', 'blue')
        map.set('kite', 'pink')
        map.set('lion', 'golden')
    })



    describe("Initial test",()=>{
        test('Constructor, set and get work fine',()=>{
            expect(map.get('apple')).toBe('red');
            expect(map.get('banana')).toBe('yellow')
            expect(map.get('carrot')).toBe('orange')
        })
    })

    describe("Second test",()=>{
        
        test('Has and delete work fine',()=>{
            
            expect(map.has('grape')).toBe(true)
            expect(map.has('jacket')).toBe(true)
            map.delete('hat');
            map.delete('kite')
            expect(map.has('jacket')).toBe(true)
            expect(map.has('kite')).toBe(false)
        })
    })

    describe("Third test",()=>{
        
        test('Size and clear work fine',()=>{

            map.delete('kite')
            expect(map.size).toBe(11)

            map.clear()
            expect(map.size).toBe(0)
        })
    })

    describe("Fourth test",()=>{
        
        test('Resize works fine',()=>{

            map.set('puma', 'black')
            map.set('crocodile', 'silver')
            map.set('caribou', 'brown')
            map.set('gazelle', 'brown')
            map.set('buffalo', 'black')
            map.set('goose', 'white')


            
            expect(map.size).toBe(18)
            expect(map.capacity).toBe(32);
            expect(map.load).toBeLessThan(0.75);
        })
    })
})