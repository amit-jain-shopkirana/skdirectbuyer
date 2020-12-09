export interface BrandMasterPageFilter {
    BrandId: number;
    BrandName: string;
    CompanyName: string;
    Skip: number;
    Take: number;
}


export interface SellerProductFilter {
    SellerId: string;
    CateogryId: number;
    BrandId: number;
    ParentProductId: number;
    Id: number;
    Skip: number;
    Take: number;
    Latitude: number;
    Longitude: number;
    ProductName: string;
    CateogryName : string;
    BrandName : string;
    TagId : number;
    Keyword : any;
}

export interface CategoryFilter {
    Id: number;
    ParentCategoryId : number;
    CategoryName: string;
    Skip: number;
    Take: number;
    IsParentCategory : boolean
}

export interface TagMasterFilter 
{
    Id : number;
    Name : string;
}