export interface SellerProductFilter {
    SellerId: string;
    CateogryId: number;
    BrandId: number;
    Latitude: number;
    Longitude: number;
    ProductName : string;
    Skip : number;
    Take : number;
    ParentProductId : number;
    Keyword : string;
}

export interface CartItemDC {
    // MOQ: number;
    // Mrp: number;
    // Margin: number;
    // ProductMasterId: number;
    // SellerId: string;
    // BuyerId: number;
    Quantity: number;
    // Price: number;
    CookieValue: string;
    // ImagePath: string;
    Id: number;
    ProductVariantAttributeId : number;
    ProductVariantId : number[];
}
export interface DeleteCartItemDC {
    CookieValue: string;
    Id: number;
}

export interface PlaceOrderDC {
    UserLocationId: number;
    MongoId: string;
    DeliveryOption : string;
    PaymentMode : string;
}

export interface StoreViewDC {
    SellerId : string;
}

export interface ProductViewDC {
    ProductId : number;
}