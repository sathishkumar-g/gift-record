import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { GiftRecordItem } from '../models/gift-record-item';
import { GiftRecordService } from '../services/gift-record.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public selectColumn: string[] = ['select'];
  public displayedColumns: string[] = ['name', 'area', 'city', 'job', 'amount', 'gift', 'gold'];
  public columnsToDisplay: string[] = [...this.selectColumn, ...this.displayedColumns, 'actions'];
  selection = new SelectionModel<GiftRecordItem>(true, []);
  //cities = ['Physician', 'Software Developer', 'Dentist', 'Nurse'];

  public dataSource: MatTableDataSource<GiftRecordItem>;
  private serviceSubscribe: Subscription;
  private subject: BehaviorSubject<GiftRecordItem[]>;

  updatedRecord: GiftRecordItem;
  @Input() overlay: boolean = true;
  constructor(private giftRecordService: GiftRecordService, public dialog: MatDialog) {
  }
  edit(data: GiftRecordItem) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.overlay = true;
        this.giftRecordService.edit(result).subscribe(response => {
          this.updatedRecord = null,
            this.updatedRecord = this.dataSource.data.find(record => record.serialNumber == result.serialNumber);
          this.updatedRecord.name = result.name;
          this.updatedRecord.area = result.area;
          this.updatedRecord.city = result.city;
          this.updatedRecord.job = result.job;
          this.updatedRecord.amount = result.amount;
          this.updatedRecord.gift = result.gift;
          this.updatedRecord.gold = result.gold;
          this.overlay = false;
        });
      }
    });
  }

  delete(data: GiftRecordItem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.overlay = true;
        this.giftRecordService.remove(data).subscribe(response => {
          if (response == 'SUCCESS') {
            this.dataSource.data = this.dataSource.data.filter(x => {
              return x.serialNumber != data.serialNumber;
            });
            this.subject.next(this.dataSource.data);
            this.overlay = false;
          }
        });
      }
    });
  }

  deleteSelectedData() {
    const itemsSelected = this.selection.selected;
    if (itemsSelected.length > 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.overlay = true;
          this.giftRecordService.deleteSelectedData(itemsSelected).subscribe(response => {
            if (response == 'SUCCESS') {
              this.dataSource.data = this.dataSource.data.filter((element) => !itemsSelected.includes(element));
              this.subject.next(this.dataSource.data);
              this.overlay = false;
            }
          });
          this.selection.clear();
        }
      });
    } else {
      alert("Select at least one row");
    }
  }

  add(data: GiftRecordItem) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: new GiftRecordItem(),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.overlay = true;
        this.giftRecordService.add(result).subscribe(response => {
          this.dataSource.data.push(response);
          this.subject.next(this.dataSource.data);
          this.overlay = false;
        });
      }
    });
  }

  ngAfterViewInit(): void {

  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.subject = new BehaviorSubject([]);
    this.dataSource = new MatTableDataSource<GiftRecordItem>();
    this.giftRecordService.getAll().subscribe((response) => {
      this.subject.next(response.giftRecords);
      this.overlay = false;
    });
    this.serviceSubscribe = this.subject.subscribe(obs => {
      this.dataSource.data = obs;
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
    });

  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  applyFilter(eventTarget: EventTarget) {
    //console.log((eventTarget as HTMLInputElement).value);
    let filterValue: string = (eventTarget as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: GiftRecordItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serialNumber + 1}`;
  }

}
