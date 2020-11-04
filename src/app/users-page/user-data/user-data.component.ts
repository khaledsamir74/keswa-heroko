import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { start } from 'repl';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() childMessage: string;
  @Output() sendBack = new EventEmitter<string>();
  @ViewChild('profileID') idProfile;
  @ViewChild('ID') iduser;
  @ViewChild('Name') NameUser;
  @ViewChild('Type') TypeUser;
  @ViewChild('Gender') GenderUser;
  @ViewChild('birthday') birthdayUser;
  @ViewChild('phoneNumber') phoneNumberUser;
  @ViewChild('email') emailUser;
  @ViewChild('pImage') profImg;
  fileImg: any = {} as any;
  edited: any = {} as any;
  gender: any = {} as any;
  type: any = {} as any;
  convertedDate: string;
  addNew: boolean = false;
  imgLink: any = "./assets/PP.png";
  constructor(private cdRef: ChangeDetectorRef, private http: HttpClient) {

  }
  ngOnInit(): void {
    //----------------gender fill
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefGender')
      .subscribe(data => {
        this.gender = JSON.parse(JSON.stringify(data)).responseData;

      },error => {console.log(error);
      })

    //----------------type fill
    this.http.get('http://kaftech.org/kaftech-keswa-api-test/ref/getAllRefData/RefUserType')
      .subscribe(data => {
        this.type = JSON.parse(JSON.stringify(data)).responseData;
        
      })
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (this.childMessage == "") {
      this.imgLink = "./assets/PP.png";
      this.convertedDate = "";
      this.edited = [];
      this.addNew = true;
    }
    else {
      this.addNew = false;
      const params = new HttpParams();
      this.http.get('http://kaftech.org/kaftech-keswa-api-test/userProfile/getUserProfile?userProfileId=' + this.childMessage)
        .subscribe(data => {
          this.edited = JSON.parse(JSON.stringify(data)).responseData;
          var d = new Date(parseInt(this.edited.birthDate.substring(6, 10), 10), parseInt(this.edited.birthDate.substring(3, 5), 10) - 1, parseInt(this.edited.birthDate.substring(0, 3), 10));
          this.convertedDate = new DatePipe('en-US').transform(d, 'yyyy-MM-dd')
          this.imgLink = "./assets/PP.png";
          if (this.edited.profilePhoto) {
            this.imgLink = "data:image/png;base64,"+this.edited.profilePhoto;
          }
          //-----------------------------------------Gender Select

          //-------------------------------------------Type select

        })
    }
  }
  onSaveBtn() {
    if (this.addNew) {
      var requestAdd = {
        requestUserId: '1',
        requestData: {
          "userId": this.iduser.nativeElement.value,
          "userTypeCode": this.TypeUser.nativeElement.value,
          "userTypeDesc": this.type[this.TypeUser.nativeElement.selectedIndex].refDescAr,
          "userName": this.NameUser.nativeElement.value,
          "genderCode": this.GenderUser.nativeElement.value,
          "genderDesc": this.gender[this.GenderUser.nativeElement.selectedIndex].refDescAr,
          "birthDate": new DatePipe('en-US').transform(new Date(this.birthdayUser.nativeElement.value), 'dd/MM/yyyy'),
          "email": this.emailUser.nativeElement.value,
          "phoneNumber": this.phoneNumberUser.nativeElement.value,
          "profilePhoto": this.imgLink.substring(23),
          "active": true
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postNewUser", requestAdd)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            alert("User Added Successfully");
            this.edited.userProfileId = obj.responseData.userProfileId;
            this.sendBack.emit("save" + obj.responseData.userProfileId);
          }
          else {
            alert("Error during Adding");
          }
        })
        console.log(this.imgLink.substring(23));
    }
    else {
      var requestEdit = {
        requestUserId: '1',
        requestData: {
          "userProfileId": this.edited.userProfileId,
          "userId": this.iduser.nativeElement.value,
          "userTypeCode": this.TypeUser.nativeElement.value,
          "userTypeDesc": this.type[this.TypeUser.nativeElement.selectedIndex].refDescAr,
          "userName": this.NameUser.nativeElement.value,
          "genderCode": this.GenderUser.nativeElement.value,
          "genderDesc": this.gender[this.GenderUser.nativeElement.selectedIndex].refDescAr,
          "birthDate": new DatePipe('en-US').transform(new Date(this.birthdayUser.nativeElement.value), 'dd/MM/yyyy'),
          "email": this.emailUser.nativeElement.value,
          "phoneNumber": this.phoneNumberUser.nativeElement.value,
          "profilePhoto": this.imgLink.substring(23),
          "active": true
        }
      };
      this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUser", requestEdit)
        .subscribe(data => {
          var obj = JSON.parse(JSON.stringify(data));
          if (obj.responseCode == "200") {
            alert("User Edited Successfully");
          }
          else {
            alert("Error during Editing");
          }
        })
    }
  }
  onActivateBtn() {
    console.log("step 1");
    var requestActiv = {
      requestUserId: '1',
      requestData: {
        "userProfileId": this.childMessage,
        "active": true
      }
    };
    this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUser", requestActiv)
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        if (obj.responseCode == "200") {
          alert("Activated");
          this.edited.active = true;
        }
        else {
          alert("Error during acivate");
        }
      })
  }
  onDeActivateBtn() {
    var requestDeActiv = {
      requestUserId: '1',
      requestData: {
        "userProfileId": this.childMessage,
        "active": false
      }
    };
    this.http.post("http://kaftech.org/kaftech-keswa-api-test/userProfile/postEditUser", requestDeActiv)
      .subscribe(data => {
        var obj = JSON.parse(JSON.stringify(data));
        if (obj.responseCode == "200") {
          alert("DeActivated");
          this.edited.active = false;
        }
        else {
          alert("Error during Deacivate");
        }
      })
  }
  onBackBtn() {
    this.sendBack.emit("back");
  }
  async imageLoaded(){
    this.fileImg= this.profImg.nativeElement.files[0];
    this.imgLink=await this.toBase64(this.fileImg);
    console.log(this.imgLink);
  }
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

}
