export class FormData {
    FirstName: string = '';
    MiddleName : string = '';
    LastName: string = '';
    Email: string = '';
    Id :  number;        
    UserDetailId : number;
    PhoneNumber : string;
    PasswordHash : string;
    MobileNumber : string;
    OTPData : string;
    Otp : string;
    Password : string;
    Userid : string;
    PincodeMasterId : number;
    AspUserId : string;
    SellerId : number;
    userExist : boolean;

    clear() {
        this.FirstName = '';
        this.MiddleName = '';
        this.LastName = '';
        this.Email = '';
        this.Id = null;
         this.UserDetailId = null;
        this.SellerId = null;
    }
}