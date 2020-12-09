export interface OrderDetailDC
{
    Id: number;
    OrderId: number;
    ProductMasterId: number;
    ProductName: string;
    ImagePath: string;
    Quantity: number;
    SellingPrice: number;
    Mrp: number;
    TotalPrice: number;

    TotalSaving: number;
    TotalDiscountAmount: number;

}