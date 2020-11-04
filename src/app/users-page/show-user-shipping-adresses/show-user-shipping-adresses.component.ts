import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-show-user-shipping-adresses',
  templateUrl: './show-user-shipping-adresses.component.html',
  styleUrls: ['./show-user-shipping-adresses.component.css']
})
export class ShowUserShippingAdressesComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  @Output() sendShippingData = new EventEmitter<string>();
  @Input() childMessage;
  elements: any = [];
  setDefaultId: any = [-1, -1];
  headElements = ['ID', 'Country', 'Governorate', 'City', 'Address', 'Defalut', 'Edit', 'Delete'];
  noData:boolean = false;
  searchText: string = '';
  previous: string;

  maxVisibleItems: number = 5;
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient) {
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  fillDataTable(data: JSON) {

    this.elements = [];
    for (var i in data) {
      this.elements.push({ ID: data[i].userShippingAddressId, Country: data[i].countryDesc, Governorate: data[i].governorateDesc, City: data[i].cityDesc, Address: data[i].shippingAddress, Defalut: data[i].defaultShippingAddress, UserId: data[i].userProfileId });
    }
    console.log(this.elements);
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
  ngOnChanges(childMessage: string): void {
    const params = new HttpParams();
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/userProfile/getAllUserShippingAddress?userProfileId=' + this.childMessage)
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        this.fillDataTable(obj.responseData);
      })
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
    this.sendShippingData.emit(value+","+this.childMessage);
  }

  onAddBtn() {
    this.sendShippingData.emit(","+this.childMessage);
  }
  setDefault(value: number, idValue: number) {
    this.setDefaultId = [value, idValue];
    if (this.setDefaultId[0] != -1) {
      var requestData = {
        requestUserId: this.setDefaultId[1],
        requestData: {
          userShippingAddressId: this.setDefaultId[0]
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postSetDefaultUserShippingAddress", requestData)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            alert("Shipping address with ( ID "+value+" )set as Default address.");
          }
          else {
            alert("Error during request");
          }
        })
    }
  }
  onDeletetn(value: any, index: number) {
    if (confirm("Do you want to delete Shipping address (ID = " + value + " )")) {
      this.http.delete('http://kaftech.org/kaftech-keswa-api-test/userProfile/deleteUserShippingAddress?userShippingAddressId=' + value)
        .subscribe(data => {
          this.mdbTable.removeRow(index - 1);
          alert("Shipping address deleted");
        })
    }
  }
}