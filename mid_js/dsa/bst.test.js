import {Node, BST} from './BST.js'

describe('Binary Search Tree test', ()=>{

    let bst;

    beforeEach(()=>{
        bst = new BST();

        bst.insert(15);
        bst.insert(10);
        bst.insert(20);
        bst.insert(8);
        bst.insert(12);
        bst.insert(17);
        bst.insert(25);
    })

    describe('Contains works fine',()=>{
        test('',()=>{
            expect(bst.contains(12)).toBe(true);
            expect(bst.contains(99)).toBe(false);
        })
    })

    describe('Get functions work fine',()=>{
        test('',()=>{
            expect(bst.get_min()).toBe(8);
            expect(bst.get_max()).toBe(25);
            expect(bst.get_height()).toBe(2);
        })
    })

    describe('Delete work fine',()=>{
        test('',()=>{
            expect(bst.delete(10).contains(10)).toBe(false);
            
        })
    })

    //      15,
    //     10,20,
    //   8,12,17,25
    describe('BFS Traversal works fine', () => {
        test('BFS', () => {
            expect(bst.bfs()).toEqual([15,10,20,8,12,17,25]);
        });
    });

    describe('DFS Traversal works fine', () => {
        test('DFS', () => {
            expect(bst.dfs()).toEqual([8,10,12,15,17,20,25]);
        });
    });

});

