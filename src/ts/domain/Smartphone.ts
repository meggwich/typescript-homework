import Buyable from './Buyable';

export default class Smartphone implements Buyable {
    readonly multiplicable: boolean = true;

    constructor(
        readonly id: number,
        readonly name: string,
        readonly price: number,
        readonly model: string,
        readonly brand: string
    ) { }
}