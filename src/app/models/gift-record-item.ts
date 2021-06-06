export class GiftRecordItem {
    serialNumber?: number;
    name?: string;
    area?: string;
    city?: string;
    job?: string;
    amount?: number;
    gift?: string;
    gold?: string;

    constructor(serialNumber: number = 0,
        name: string = '', area: string = '', city: string = '', job: string = '', amount: number = 0, gift: string = '', gold = '') {
        this.serialNumber = serialNumber;
        this.name = name;
        this.area = area;
        this.city = city;
        this.job = job;
        this.amount = amount;
        this.gift = gift;
        this.gold = gold;
    }
}
