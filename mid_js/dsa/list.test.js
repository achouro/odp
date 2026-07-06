import {Node, List} from './linked_list.js'


describe('Linked list test', ()=>{

    let list;

    beforeEach(()=>{
        list = new List();

        list.append("dog");
        list.append("cat");
        list.append("parrot");
        list.append("hamster");
        list.append("snake");
        list.append("turtle");
    })



    describe("Initial test",()=>{
        test('Constructor, append and to_string work fine',()=>{
            expect(list.to_string()).toEqual('( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null')
        })
    })

    describe("Second test",()=>{
        
        test('Pop back/front work fine',()=>{
            list.pop_front();
            list.pop_back();
            expect(list.to_string()).toEqual('( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> null')
        })
    })

    describe("Third test",()=>{
        
        test('Insert at delete at work fine',()=>{
            list.insert_at(1,'elephant');
            //console.log(list);
            list.delete_at(3);
            expect(list.to_string()).toEqual('( dog ) -> ( elephant ) -> ( cat ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null')
        })
    })
})