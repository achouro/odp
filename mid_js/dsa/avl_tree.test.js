

import {Node, AVL} from './avl_tree.js'

describe('Self-balancing Binary Search Tree test', ()=>{

    let bst;

    let array=[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
    let sorted=[...new Set(array)].sort((a,b)=>a-b)
    

    beforeEach(()=>{
        bst = new AVL();

        bst.build_tree(array);

    })

    describe('Contains works fine',()=>{
        test('',()=>{
            expect(bst.contains(67)).toBe(true);
            expect(bst.contains(325)).toBe(false);
        })
    })

    describe('Get functions work fine',()=>{
        test('',()=>{
            expect(bst.get_min()).toBe(1);
            expect(bst.get_max()).toBe(6345);
            expect(bst.get_height()).toBe(3);
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
            expect(bst.bfs()).toEqual([8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]);
        });
    });

    describe('DFS Traversal works fine', () => {
        test('DFS', () => {
            
            expect(bst.dfs()).toEqual(sorted);
        });
    });

});

