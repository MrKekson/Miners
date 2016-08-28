import {Component} from '@angular/core';

export enum Shape  { Sphere,
              triangle,
              rect,              
            }

export interface IDrawable {
    x: number;
    y: number;
    
    facing : number;//360
    shape: Shape;
    
    visible: boolean;
}