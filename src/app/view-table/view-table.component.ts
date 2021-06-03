import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { GiftRecordService } from '../services/gift-record.service';
import { GiftRecordItem } from '../models/gift-record-item';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.scss']
})
export class ViewTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() overlay: boolean = true;
  public displayedColumns: string[] = ['name', 'area', 'city', 'job', 'amount', 'gift', 'gold'];
  public columnsToDisplay: string[] = [...this.displayedColumns];

  public dataSource: MatTableDataSource<GiftRecordItem>;

  constructor(private giftRecordService: GiftRecordService, public dialog: MatDialog) {

  }

  ngAfterViewInit(): void {

  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<GiftRecordItem>();
    this.giftRecordService.getAll().subscribe((response) => {
      this.dataSource.data = response.giftRecords;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.dataSource.filterPredicate = function (eventTarget, filterValue): boolean {
        return eventTarget.name.toLowerCase().includes(filterValue) ||
          eventTarget.area.toLowerCase().includes(filterValue) ||
          eventTarget.city.toLowerCase().includes(filterValue) ||
          eventTarget.job.toLowerCase().includes(filterValue) ||
          eventTarget.amount.toString().toLowerCase().includes(filterValue) ||
          eventTarget.gift.toLowerCase().includes(filterValue) ||
          eventTarget.gold.toLowerCase().includes(filterValue)
          ;
      };
      this.overlay = false;
    });
  }


  applyFilter(eventTarget: EventTarget) {
    let filterValue: string = (eventTarget as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
