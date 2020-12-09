export interface OtpMasterDC
{
        Otp : string,
        Purpose : string,
        Id : number,
        CreatedDate : Date,
         ModifiedDate : Date,
        CreatedBy : number,
        ModifiedBy : number,
        IsActive : boolean,
        IsDelete : boolean,
        IsVerfied : boolean,
        IsUserExist : boolean,
        MobileNumber : string,
        Role : string,
}

export interface UserDetailDc
    {
        Id : number,
        FirstName : string,
        MiddleName : string,
        LastName : string,
        UserId : string,
        Email : string,       
        CreatedDate : Date,
        ModifiedDate : Date,
        CreatedBy : number,
        ModifiedBy : number,
        IsActive : boolean,
        IsDelete : boolean,
        PincodeMasterId : number,
        AspUserId : string,
    }
export interface UserLocationDc
    {
        UserDetailId : number,
        AddressOne : string,
        AddressTwo : string,
        AddressThree : string,
        PinCodeMasterId : number,

        LocationType : string,
        IsPrimaryAddress : boolean,

        Id : number,
        CreatedDate : Date,
        ModifiedDate : Date,
        CreatedBy : number,
        ModifiedBy : number,
        IsActive : boolean,
        IsDelete : boolean,

        IsSkip : boolean,
        Latitiute : number,
        Longitude : number,
        Pincode : string,
    }