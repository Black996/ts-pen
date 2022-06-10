import { swap } from "../../src/helpers";

describe("Testing swap helper function",()=>{
    let numArr:number[]
    let strArr:string[]

    beforeEach(()=>{
        numArr = [1,2,3,4,5];
        strArr = ["a","b","c","d"]
    })

    it("swap should swap between the numbers 2 and 3",()=>{
        const arr = [1,2,3,4];
        const leftIndex = arr.findIndex((val)=>val == 2);
        const rightIndex = arr.findIndex((val)=>val == 3);

        expect(swap({arr,leftIndex, rightIndex})).toEqual([1,3,2,4])
    })
})