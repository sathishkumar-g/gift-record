import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TestService } from '../services/test.service';
import { GiftRecordItemTest } from '../models/gift-record-item-test';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public selectColumn: string[] = ['select'];
  //public displayedColumns: string[] = ['firstName', 'age', 'job', '$$edit'];
  public displayedColumns: string[] = ['name', 'area', 'city', 'job', 'amount', 'gift', 'gold'];
  public columnsToDisplay: string[] = [...this.selectColumn, ...this.displayedColumns, 'actions'];
  //dataSchema = USER_SCHEMA;
  selection = new SelectionModel<GiftRecordItemTest>(true, []);
  //cities = ['Physician', 'Software Developer', 'Dentist', 'Nurse'];

  public dataSource: MatTableDataSource<GiftRecordItemTest>;
  private serviceSubscribe: Subscription;

  constructor(private personsService: TestService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<GiftRecordItemTest>();
  }
  edit(data: GiftRecordItemTest) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.edit(result);
      }
    });
  }

  // edit(data: Person) {
  //   this.personsService.edit(data);
  // }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.remove(id);
      }
    });
  }

  add(data: GiftRecordItemTest) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: new GiftRecordItemTest(new Date().getTime()),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.add(result);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.personsService.getAll();
    this.serviceSubscribe = this.personsService.persons$.subscribe(res => {
      this.dataSource.data = res;
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
  checkboxLabel(row?: GiftRecordItemTest): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serialNumber + 1}`;
  }

  deleteData() {
    const numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      
      const dialogRef = this.dialog.open(ConfirmDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.personsService.deleteData(numSelected);
          this.selection.clear();
        }
      });
    } else {
      alert("Select at least one row");
    }
  }

}
