interface ISwapParams {
    arr:Array<string | number>;
    leftIndex:number;
    rightIndex:number;
}

export function swap({arr,leftIndex,rightIndex}:ISwapParams){
    [arr[leftIndex],arr[rightIndex]]
     =  
    [arr[rightIndex],arr[leftIndex]]

    return arr;
}

// let timerId: NodeJS.Timeout;

// type DebounceCallback = () => void;

// interface debounceParams {
//   callback: DebounceCallback;
//   debouceTime: number;
// }

// export function debounce({ callback, debouceTime }: debounceParams) {
//   // console.log("I ran");

//   if (timerId) {
//     clearTimeout(timerId);
//     console.log("cleared", timerId);
//   }

//   timerId = setTimeout(callback, debouceTime);
// }
