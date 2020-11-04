import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user-coupon',
  templateUrl: './edit-user-coupon.component.html',
  styleUrls: ['./edit-user-coupon.component.css']
})
export class EditUserCouponComponent implements OnInit {
  @Input() childCoupon;
  @Output() sendCouponBack= new EventEmitter<string>();
  @ViewChild('ID') iduser;
  @ViewChild('couponType') cType;
  @ViewChild('couponCode') cCode;
  @ViewChild('discountValue') dValue;
  @ViewChild('discType') dType;
  @ViewChild('startdate') sDate;
  @ViewChild('enddate') eDate;
  @ViewChild('desc') desc;
  edited: any = {} as any;
  convertedStartDate: string;
  convertedEndDate: string;
  addNew: boolean = false;
  typeC: any = {} as any;
  typeD: any = {} as any;
  couponCodeDisabled:boolean=false;
  
  cutChild: string[];
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    //----------------typeC fill
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefCouponType')
      .subscribe(data => {
        this.typeC = JSON.parse(JSON.stringify(data)).responseData;

      },error => {console.log(error);
      })
      
    //----------------typeD fill
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefDiscountType')
    .subscribe(data => {
      this.typeD = JSON.parse(JSON.stringify(data)).responseData;

    },error => {console.log(error);
    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cutChild=this.childCoupon.split(",");
    if (this.cutChild[0] == "") {
      this.convertedStartDate = "";
      this.convertedEndDate = "2030-01-01";
      this.edited = [];
      this.addNew = true;
    }
    else {
      this.addNew = false;
      const params = new HttpParams();
      this.http.get('http://kaftech.org/kaftech-keswa-api-test/userProfile/getUserCoupon?userCouponId=' + this.cutChild[0])
        .subscribe(data => {
          this.edited = JSON.parse(JSON.stringify(data)).responseData;
          var d = new Date(parseInt(this.edited.startDate.substring(6, 10), 10), parseInt(this.edited.startDate.substring(3, 5), 10) - 1, parseInt(this.edited.startDate.substring(0, 3), 10));
          this.convertedStartDate = new DatePipe('en-US').transform(d, 'yyyy-MM-dd');
          d = new Date(parseInt(this.edited.endDate.substring(6, 10), 10), parseInt(this.edited.endDate.substring(3, 5), 10) - 1, parseInt(this.edited.endDate.substring(0, 3), 10));
          this.convertedEndDate = new DatePipe('en-US').transform(d, 'yyyy-MM-dd');
          
        })
    }
  }
  onSaveBtn() {
    let dateEnd = this.convertedEndDate;
    let couponT ="";
    if (dateEnd==""){
      dateEnd="01/01/2030";
    }
    if(this.cType.nativeElement.selectedIndex!=0){
      couponT=this.typeC[this.cType.nativeElement.selectedIndex-1].refDescAr;
    }
    if (this.addNew) {
      var requestAdd = {
        requestUserId: '1',
        requestData: {
          "userProfileId": this.cutChild[1],
          "couponTypeCode": this.cType.nativeElement.value,
          "couponTypeDesc": couponT,
          "discountTypeCode": this.dType.nativeElement.value,
          "discountTypeDesc": this.typeD[this.dType.nativeElement.selectedIndex].refDescAr,
          "discountValue": this.dValue.nativeElement.value,
          "startDate": new DatePipe('en-US').transform(new Date(this.sDate.nativeElement.value), 'dd/MM/yyyy'),
          "endDate": dateEnd,
          "couponDesc": this.desc.nativeElement.value,
          "couponCode": this.cCode.nativeElement.value
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postNewUserCoupon", requestAdd)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            alert("Coupon Added Successfully");
            this.sendCouponBack.emit("save");
          }
          else {
            alert(obj.responseMessage);
          }
        })
    }
    else {
      var requestEdit = {
        requestUserId: '1',
        requestData: {
          "userCouponId": this.cutChild[0],
          "userProfileId": this.cutChild[1],
          "couponTypeCode": this.cType.nativeElement.value,
          "couponTypeDesc": couponT,
          "discountTypeCode": this.dType.nativeElement.value,
          "discountTypeDesc": this.typeD[this.dType.nativeElement.selectedIndex].refDescAr,
          "discountValue": this.dValue.nativeElement.value,
          "startDate": new DatePipe('en-US').transform(new Date(this.sDate.nativeElement.value), 'dd/MM/yyyy'),
          "endDate": dateEnd,
          "couponDesc": this.desc.nativeElement.value,
          "couponCode": this.cCode.nativeElement.value
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUserCoupon", requestEdit)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            alert("Coupon Edited Successfully");
            this.sendCouponBack.emit("save");
          }
          else {
            alert("Error during Editing");
          }
        })
    }
  }
  onBackBtn() {
    this.sendCouponBack.emit("back");
  }
  onCouponTypeChanged(){
    if(this.cType.nativeElement.selectedIndex==0){
      this.couponCodeDisabled=false;
      this.cCode.nativeElement.value="";
    }
    else{
      this.couponCodeDisabled=true;
    }
  }
}
