export interface UserLocationDc
{
    UserDetailId: number;
    AddressOne: string;
    AddressTwo: string;
    AddressThree: string;
    // PinCodeMasterId: number;
    LocationType: string;
    IsPrimaryAddress: boolean;
    Id: number;
    IsActive: boolean;
    IsDelete: boolean;
    Latitiute: number | null;
    Longitude: number | null;
    Pincode: string;
    State: string;
    City: string;
}