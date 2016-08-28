import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

export enum Shape  { Sphere,
              triangle,
              rect,              
            }

export class Drawable {
    x: number = 0;
    y: number = 0;
    
    facing : number = 0;//360
    shape: Shape = 0;
    colour: string = '#ff0000';
    
    visible: boolean;



}