export interface OrderRatingDC
{
    Rating : number,
    Comment : string,
    Id : number
}
export interface OrderFilter {
    Orderid : number,       
    Status : number,
    Skip : number,
    Take : number,
  }