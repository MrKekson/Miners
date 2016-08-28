export enum Shape { Sphere = 0,
              Triangle,
              Square,
              Pentagon              
            }

export class Drawable {
    public x: number = 0;
    public y: number = 0;
    
    public facing : number = 0;//360
    public shape: Shape = 0;
    public colour: string;
    public borderColour: string;
    public size:number; //not ok
    
    visible: boolean;
    constructor(x:number = 0, y:number = 0, facing: number = 0,size: number,  shape: Shape = 0, colour: string = '#ff0000', borderColour: string = "#ffffff", visible: boolean = true )
    {
        this.y=y;
        this.x=x;
        this.visible = visible;
        this.size = size;
        this.shape = shape;
        this.facing = facing;
        this.colour = colour;
        this.borderColour = borderColour;
    }



}