
import React from 'react';

export const SISWA = 0;
export const GURU = 1;
export const MAPEL = 2;
export const KELAS = 3;
export const COURSE = 4;
export const SIMPLE = 5;
export const STATUS_LOADING = -1;
export const STATUS_IDLE = 0;
export const STATUS_LOADING_DONE = 1;

export function arrayToString(arr,type) {
    console.log('masuk array to string');
    let pilihanStr = '';
    if(arr !== null){
        let length = arr.length;
        for(let i = 0; i<length;i++){
            switch(type){
                case SISWA:
                case GURU:
                    pilihanStr += arr[i].username;
                    break;
                case MAPEL:
                    pilihanStr += arr[i].value;
                    break;
                case KELAS:
                    break;
                case COURSE:
                    break;
                case SIMPLE:
                    pilihanStr += arr[i];
                    break;
                default:
                    return '';
            }
            
            if(i < length-1){
                pilihanStr += ', ';
            }
        }
    }
    return pilihanStr;
  }

export function createJSONArrayReport(){
    
}

