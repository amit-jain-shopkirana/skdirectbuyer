export interface OrderMasterDC
{
    Id: number;
    OrderStatus: string;
    TotalPrice: number;
    TotalDiscountAmount: number;
    TotalSavingAmount: number;
    DeliveryCharges: number;
    PhoneNumber: string;
    CreatedDate: Date | string;

    //client side properties
    image?: string;
}