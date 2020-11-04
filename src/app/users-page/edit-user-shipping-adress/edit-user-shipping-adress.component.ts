import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user-shipping-adress',
  templateUrl: './edit-user-shipping-adress.component.html',
  styleUrls: ['./edit-user-shipping-adress.component.css']
})
export class EditUserShippingAdressComponent implements OnInit {
  @Input() childShipping;
  @Output() sendShippingBack = new EventEmitter<string>();
  @ViewChild('ID') idshipping;
  @ViewChild('default') defaultshipping;
  @ViewChild('Country') Countryshipping;
  @ViewChild('Gov') Govshipping;
  @ViewChild('City') Cityshipping;
  @ViewChild('postcode') postcodeshipping;
  @ViewChild('address') addressshipping;
  edited: any = {} as any;
  convertedDate: string;
  d: Date;
  addNew: boolean = false;
  country: any = {} as any;
  governorate: any = {} as any;
  city: any = {} as any;
  cutChild: string[];
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient) {

  }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.cutChild = this.childShipping.split(",");
    if (this.cutChild[0] == "") {
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefCountry')
    .subscribe(data => {
      this.country = JSON.parse(JSON.stringify(data)).responseData;
      //----------------governorate fill
      this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefGovernorate?parentRefCode=' + this.country[0].refCode)
        .subscribe(data2 => {
          this.governorate = JSON.parse(JSON.stringify(data2)).responseData;
          //----------------city fill
          this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefCity?parentRefCode=' + this.governorate[0].refCode)
            .subscribe(data3 => {
              this.city = JSON.parse(JSON.stringify(data3)).responseData;
            }, error => {
              console.log(error);
            })
        }, error => {
          console.log(error);
        })
    }, error => {
      console.log(error);
    })
      this.edited = [];
      this.addNew = true;
    }
    else {
      this.addNew = false;
      const params = new HttpParams();
      this.http.get('http://kaftech.org/kaftech-keswa-api-test/userProfile/getUserShippingAddress?userShippingAddressId=' + this.cutChild[0])
        .subscribe(data => {
          this.edited = JSON.parse(JSON.stringify(data)).responseData;
          this.loadLocations(this.edited.countryCode,this.edited.governorateCode);
        }, error => {
          console.log(error);})
    }
  }
  onSaveBtn() {
    if (this.addNew) {
      var requestAdd = {
        requestUserId: '1',
        requestData: {
          "userProfileId": this.cutChild[1],
          "countryCode": this.Countryshipping.nativeElement.value,
          "countryDesc": this.country[this.Countryshipping.nativeElement.selectedIndex].refDescAr,
          "governorateCode": this.Govshipping.nativeElement.value,
          "governorateDesc": this.governorate[this.Govshipping.nativeElement.selectedIndex].refDescAr,
          "cityCode": this.Cityshipping.nativeElement.value,
          "cityDesc": this.city[this.Cityshipping.nativeElement.selectedIndex].refDescAr,
          "shippingAddress": this.addressshipping.nativeElement.value,
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postNewUserShippingAddress", requestAdd)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            alert("Shipping Added Successfully");
            this.edited.userProfileId = obj.responseData.userProfileId;
            this.sendShippingBack.emit("save");
          }
          else {
            alert("Error during Adding");
          }
        })
    }
    else {
      var requestEdit = {
        requestUserId: '1',
        requestData: {
          "userShippingAddressId": this.cutChild[0],
          "userProfileId": this.cutChild[1],
          "countryCode": this.Countryshipping.nativeElement.value,
          "countryDesc": this.country[this.Countryshipping.nativeElement.selectedIndex].refDescAr,
          "governorateCode": this.Govshipping.nativeElement.value,
          "governorateDesc": this.governorate[this.Govshipping.nativeElement.selectedIndex].refDescAr,
          "cityCode": this.Cityshipping.nativeElement.value,
          "cityDesc": this.city[this.Cityshipping.nativeElement.selectedIndex].refDescAr,
          "shippingAddress": this.addressshipping.nativeElement.value,
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUserShippingAddress", requestEdit)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            alert("Shipping Edited Successfully");
            this.sendShippingBack.emit("save");
          }
          else {
            alert("Error during Editing");
          }
        }, error => {
          console.log(error);
        })
    }
  }
  onBackBtn() {
    this.sendShippingBack.emit("back");
  }
  countryChanged() {
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefGovernorate?parentRefCode=' + this.country[this.Countryshipping.nativeElement.selectedIndex].refCode)
      .subscribe(data => {
        this.governorate = JSON.parse(JSON.stringify(data)).responseData;
        this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefCity?parentRefCode=' + this.governorate[0].refCode)
          .subscribe(data => {
            this.city = JSON.parse(JSON.stringify(data)).responseData;
          }, error => {
            console.log(error);
          })
      }, error => {
        console.log(error);
      })
  }
  governorateChanged() {
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/refCity?parentRefCode=' + this.governorate[this.Govshipping.nativeElement.selectedIndex].refCode)
      .subscribe(data => {
        this.city = JSON.parse(JSON.stringify(data)).responseData;
      }, error => {
        console.log(error);
      })
  }
  loadLocations(country , governorate){
    
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefCountry')
    .subscribe(data => {
      this.country = JSON.parse(JSON.stringify(data)).responseData;
      //----------------governorate fill
    //----------------country fill
        this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefGovernorate?parentRefCode=' + country)
          .subscribe(data => {
            this.governorate = JSON.parse(JSON.stringify(data)).responseData;
            //----------------city fill
            this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefCity?parentRefCode=' + governorate)
              .subscribe(data2 => {
                this.city = JSON.parse(JSON.stringify(data2)).responseData;
              }, error => {
                console.log(error);
              })
          }, error => {
            console.log(error);
          })
          
        }, error => {
          console.log(error);
        })
  }
}

