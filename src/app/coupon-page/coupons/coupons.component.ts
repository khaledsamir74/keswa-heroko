import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  @Output() sendData = new EventEmitter<string>();
  elements: any = [];
  headElements = ['id', 'name', 'price', 'rating', 'Edit', 'Status'];

  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 3;
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient) {
    const params = new HttpParams();
    this.http.get('https://cvproject1-2b75e.firebaseio.com/Food/Pizza.json')
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        this.fillDataTable(obj);
      })
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  public fillDataTable(data: JSON) {
    for (var i in data) {
      this.elements.push({ id: data[i].id, name: data[i].name, price: data[i].price, rating: data[i].rating, });
    }
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
  }
  addNewUser = () => {
    this.sendData.emit("add,-1");
  }
  onEditBtn(value: any) {
    this.sendData.emit("edit," + value);
  }
  onActivateBtn(value: any) {
    this.sendData.emit("Activate," + value);
  }
  onDeActivateBtn(value: any) {
    this.sendData.emit("Deactivate," + value);
  }
}