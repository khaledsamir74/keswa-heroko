import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-show-user-coupons',
  templateUrl: './show-user-coupons.component.html',
  styleUrls: ['./show-user-coupons.component.css']
})
  export class ShowUserCouponsComponent implements OnInit, AfterViewInit {
    @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
    @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
    @ViewChild('row', { static: true }) row: ElementRef;
    @Output() sendCouponData = new EventEmitter<string>();
    @Input() childMessage;
    elements: any = [];
    headElements = ['id', 'Type', 'Code', 'Desc' , 'DiscountValue', 'DiscountType', 'EndDate', 'Used', 'Edit', 'Delete'];
    searchText: string = '';
    previous: string;
    used:boolean=true;
    noData:boolean = false;
    maxVisibleItems: number = 5;
    constructor(private cdRef: ChangeDetectorRef,private http:HttpClient) {

    }
    ngOnChanges(childMessage:string): void {
      const params = new HttpParams();
      this.http.get('http://kaftech.org/kaftech-keswa-api-test/userProfile/getAllUserCoupon?userProfileId=' +this.childMessage)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          this.fillDataTable(obj.responseData);
        })
    }
  
    @HostListener('input') oninput() {
      this.mdbTablePagination.searchText = this.searchText;
    }
    fillDataTable(data:JSON) {
      this.elements=[];
      for (var i in data)
        {
          this.elements.push({id:data[i].userCouponId , Type: data[i].couponTypeCode, Code: data[i].couponCode, Desc:data[i].couponDesc , DiscountValue:data[i].discountValue, DiscountType:data[i].discountTypeCode, EndDate:data[i].endDate, Used:data[i].consumed});
        }
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
    if(this.elements.length==0){
      this.noData=true;
    }
    else{
      this.noData=false;
    }
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
    onEditBtn(value: any) {
      this.sendCouponData.emit(value+","+this.childMessage);
    }
    onAddBtn() {
      this.sendCouponData.emit(","+this.childMessage);
    }
    onDeletetn(value: any, index:number) {
      if(confirm("Do you want to delete Coupon (ID = "+ value+" )")){
      this.http.delete('http://kaftech.org/kaftech-keswa-api-test/userProfile/deleteUserCoupon?userCouponId=' + value)
      .subscribe(data => {
        this.mdbTable.removeRow(index-1);
        alert("Coupon deleted");
      })
      }
    }
    onUsedClick(el :any){
      el.Used=!el.Used;
      
      var requestEdit = {
        requestUserId: '1',
        requestData: {
          "userCouponId": el.id,
          "consumed": el.Used
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUserCoupon", requestEdit)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            if (el.Used)
            {alert("Coupon Used");}
            else
            {alert("Coupon Un-Used");}
          }
          else {
            alert("Eroor");
          }
        })
    }
    
  }
