import { Cell, Board } from "./knight_board";

describe("Chess Pieces Shortest Path Traversal",()=>{

    

    describe("Tests I: Knight",()=>{
        let board=new Board(8);

        board.initialise_edges((x,y)=>board.knight_moves(x,y));

        const path= board.piece_traversal([3,3],[4,3])

        test("Knight Traversal Return a Path",()=>{

            expect(path).not.toBeNull();
            expect(path.length).toBe(4);

            expect(path).toEqual([[3,3],[1,2],[2,4],[4,3]])
        });
    })

    describe("Tests II: Bishop",()=>{
        let board=new Board(8);

        board.initialise_edges((x,y)=>board.bishop_moves(x,y));

        const path= board.piece_traversal([3,3],[4,3])
        const path_bis= board.piece_traversal([3,3],[5,5])
        const path_bis_bis= board.piece_traversal([3,3],[5,7])

        test("Bishop Traversal Return a Path",()=>{

            expect(path).toBeNull();

            expect(path_bis.length).toBe(2);
            expect(path_bis).toEqual([[3,3],[5,5]])

            expect(path_bis_bis.length).toBe(3);
            expect(path_bis_bis).toEqual([[3,3],[2,4], [5,7]])
        });
    })

    describe("Tests III: Rook",()=>{
        let board=new Board(8);

        board.initialise_edges((x,y)=>board.rook_moves(x,y));

        const path= board.piece_traversal([3,3],[4,3])
        const path_bis= board.piece_traversal([3,3],[5,5])
        const path_bis_bis= board.piece_traversal([3,3],[5,7])

        test("Bishop Traversal Return a Path",()=>{

            expect(path.length).toBe(2);

            expect(path_bis.length).toBe(3);
            expect(path_bis).toEqual([[3,3], [3,5],[5,5]])

            expect(path_bis_bis.length).toBe(3);
            expect(path_bis_bis).toEqual([[3,3],[3,7], [5,7]])
        });
    })

    
})