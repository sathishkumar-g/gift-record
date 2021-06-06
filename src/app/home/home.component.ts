import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  //url:string="assets/sugysri.JPG";
  ngOnInit(): void {
  }

  slides = [
    {'image': 'assets/images/sugysri.jpg'}, 
    {'image': 'assets/images/item_1.jpg'},
    {'image': 'assets/images/item_2.JPG'}, 
    {'image': 'assets/images/item_3.JPG'}, 
    {'image': 'assets/images/item_4.JPG'}
  ];

}
