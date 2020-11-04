import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row: ElementRef;
  @Output() sendData = new EventEmitter<string>();
  elements: any = [];
  headElements = ['ID', 'UserID', 'Name', 'Gender', 'Number', 'Type', 'Edit', 'Status'];
  searchText: string = '';
  previous: string;
  loading : boolean;
  notLoading:boolean=false;
  maxVisibleItems: number = 5;
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient) {
    const params = new HttpParams();
    this.loading=true;
    console.log(this.loading);
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/userProfile/getAllUserProfile')
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        this.fillDataTable(obj.responseData);
        this.loading=false;
        console.log(this.loading);
      })
  }

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }
  public fillDataTable(data: JSON) {
    for (var i in data) {
      this.elements.push({
        ID: data[i].userProfileId,
        UserID: data[i].userId,
        Name: data[i].userName,
        Gender: data[i].genderDesc,
        Number: data[i].phoneNumber,
        Type: data[i].userTypeCode,
        Status: data[i].active,
        admin: data[i].userTypeCode == "ADMIN" ? true : false
      });
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
    this.sendData.emit("add");
  }
  onEditBtn(value: any) {
    this.sendData.emit("edit," + value);
  }
  onActivateBtn(value: any) {
    var requestActiv = {
      requestUserId: '1',
      requestData: {
        userProfileId: value.ID,
        active: true
      }
    };
    this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUser", requestActiv)
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        if (obj.responseCode == "200") { value.Status = true; }
        else {
          alert("Error during acivate");
        }
      })
  }
  onDeActivateBtn(value: any) {
    var requestActiv = {
      requestUserId: '1',
      requestData: {
        userProfileId: value.ID,
        active: false
      }
    };
    this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUser", requestActiv)
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        if (obj.responseCode == "200") { value.Status = false; }
        else {
          alert("Error during Deacivate");
        }
      })
  }
}