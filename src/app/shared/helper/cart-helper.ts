export class CartHelper {
    public static GetModelToUpdateItemQuantity(sellerProductId: number, quantity, cookieValue: string, productVariantAttributeId : number, productVariantId : number[]): any{
        return {
            Id: sellerProductId,
            Quantity: quantity,
            CookieValue: cookieValue,
            ProductVariantAttributeId : productVariantAttributeId,
            ProductVariantId : productVariantId
        }
    }
}