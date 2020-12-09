export interface OrderMasterFilter
    {
        Id: number | null;
        Status: number | null;
        SellerId : number;

        Skip : number;

        Take : number;
        FromDate : Date;
        ToDate : Date;
        Filter : string;
    }