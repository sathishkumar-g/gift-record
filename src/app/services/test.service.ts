import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GiftRecordItemTest } from '../models/gift-record-item-test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  persons$: BehaviorSubject<GiftRecordItemTest[]>;
  persons: Array<GiftRecordItemTest> = [];

  constructor() {
    this.persons$ = new BehaviorSubject([]);
    this.persons = personsData;
  }

  getAll() {
    this.persons$.next(this.persons);
  }

  add(person: GiftRecordItemTest) {
    this.persons.push(person);
    this.persons$.next(this.persons);
  }

  edit(person: GiftRecordItemTest) {
    let findElem = this.persons.find(p => p.serialNumber == person.serialNumber);
    findElem.name = person.name;
    findElem.area = person.area;
    findElem.city = person.city;
    findElem.job = person.job;
    findElem.amount = person.amount;
    findElem.gift = person.gift;
    findElem.gold = person.gold;

    this.persons$.next(this.persons);
  }

  remove(serialNumber: number) {

    this.persons = this.persons.filter(p => {
      return p.serialNumber != serialNumber;
    });

    this.persons$.next(this.persons);
  }

  deleteData(data: GiftRecordItemTest[]): Observable<string> {

    this.persons = this.persons.filter((i) => !data.includes(i));
    this.persons$.next(this.persons);
    return new Observable(observer => observer.next('Records deleted successfully'))

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // };
    // return this.http.post<string>(`${this.apiUrl}DeleteRecord/`, user, httpOptions);
  }

}

export const personsData: GiftRecordItemTest[] = [
  new GiftRecordItemTest(1, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(2, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(3, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(4, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(5, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(6, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(7, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(8, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(9, 'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(10,'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold'),
  new GiftRecordItemTest(20,'person 1', 'area', 'city', 'job', 3000, 'gift', 'gold')
]
