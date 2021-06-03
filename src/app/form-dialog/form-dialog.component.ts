import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiftRecordItem } from '../models/gift-record-item';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GiftRecordItem) {
    this.formInstance = new FormGroup({
      "serialNumber": new FormControl('', Validators.required),
      "name": new FormControl('', Validators.required),
      "area": new FormControl(''),
      "city": new FormControl('', Validators.required),
      "job": new FormControl(''),
      "amount": new FormControl(''),
      "gift": new FormControl(''),
      "gold": new FormControl('')
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {

  }

  save(): void {
    this.dialogRef.close(Object.assign(new GiftRecordItem(), this.formInstance.value));
  }

}
