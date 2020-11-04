import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  @Output() sendData = new EventEmitter<string>();
  elements: any = [];
  headElements = ['ID', 'Date', 'Total EGP', 'Govern', 'Number','Statue', 'Details'];
  searchText: string = '';
  previous: string;
  loading: boolean;
  notLoading: boolean = false;
  maxVisibleItems: number = 5;
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient, private  router: Router) {
    const params = new HttpParams();
    this.loading = true;
    console.log(this.loading);
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/customerOrder/getAllCustomerOrder')
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        this.fillDataTable(obj.responseData);
        this.loading = false;
        console.log(this.loading);
      })
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  public fillDataTable(data: JSON) {
    for (var i in data) {
      this.elements.push({
        ID: data[i].customerOrderId,
        Date: data[i].orderConfirmDate,
        TotalEGP: data[i].orderTotalEgp,
        Govern: data[i].shippingGovernorateDesc,
        Number: data[i].customerPhoneNumber,
        Statue: data[i].orderStatusCode,
      });
    }
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }
  ngOnInit() {
    if(localStorage.getItem("loggedInUser")==null){
      this.router.navigate(['/Login']);
    }

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
  onDetailsBtn(value: any) {
    this.sendData.emit("edit," + value);
  }
}