import Buyable from "./Buyable";

export default class Movie implements Buyable {
    readonly multiplicable: boolean = false;
    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        readonly img: string,
        readonly originalName: string,
        readonly year: number,
        readonly country: string,
        readonly slogan: string,
        readonly genres: string[] = [],
        readonly minutesDuration: number,
        readonly imax : boolean
    ) { }
}