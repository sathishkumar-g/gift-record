import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GiftRecord } from '../models/gift-record';
import { GiftRecordItem } from '../models/gift-record-item';
import { Constants } from '../global/constants';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiftRecordService implements OnInit {
  //giftRecords: Array<GiftRecordItem> = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    //this.http.get<GiftRecord>(`${environment.getUrl}`, { 'headers': Constants.headers });
  }
  getAll(): Observable<GiftRecord> {
    return this.http.get<GiftRecord>(`${environment.getUrl}`).pipe(
      catchError(this.handleError<GiftRecord>('getGiftRecord'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  add(record: GiftRecordItem): Observable<GiftRecordItem> {
    return this.http.post<any>(`${environment.addUrl}`, record, {
      'headers': Constants.headers
    }).pipe(
      tap(_ => console.log(`added giftRecordItem id=${record.name}`)),
      catchError(this.handleError<GiftRecord>('addGiftRecord ${record}'))
    );
  }

  edit(record: GiftRecordItem): Observable<GiftRecordItem> {
    return this.http.post<any>(`${environment.editUrl}`, record, {
      'headers': Constants.headers
    }).pipe(
      tap(_ => console.log(`updated giftRecordItem id=${record.name}`)),
      catchError(this.handleError<GiftRecord>('editGiftRecord'))
    );
  }

  remove(record: GiftRecordItem): Observable<any> {
    return this.http.post(`${environment.deleteUrl}`, record, { responseType: 'text' }).pipe(
      tap(_ => console.log(`deleted giftRecordItem id=${record.name}`)),
      catchError(this.handleError<GiftRecord>('deleteGiftRecord'))
    );
  }

  deleteSelectedData(record: GiftRecordItem[]): Observable<any> {
    let giftRecord = new GiftRecord();
    giftRecord.giftRecords = record;
    return this.http.post(`${environment.selectiveDeleteUrl}`, giftRecord, { responseType: 'text' }).pipe(
      tap(_ => console.log(`deleted ${record.length} giftRecordItems`)),
      catchError(this.handleError<GiftRecord>('deleteSelectedData'))
    );
    // this.giftRecords = this.giftRecords.filter((i) => !data.includes(i));
    // this.giftRecords$.next(this.giftRecords);
    // return new Observable(observer => observer.next('Records deleted successfully'))
  }
}



