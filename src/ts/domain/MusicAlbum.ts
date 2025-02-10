import Buyable from './Buyable';

export default class MusicAlbum implements Buyable {
    readonly multiplicable: boolean = false;
    constructor(
        readonly id: number,
        readonly name: string,
        readonly author: string,
        readonly price: number,
    ) { }
}