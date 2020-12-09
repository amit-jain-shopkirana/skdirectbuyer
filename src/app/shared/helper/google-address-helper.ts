export class GoogleAddressHelper {

    public static getPinCode(googleAddress: any): string {
        return this.getAddressComponent(googleAddress, 'postal_code');
    }

    public static getState(googleAddress: any): string {
        return this.getAddressComponent(googleAddress, 'administrative_area_level_1');
    }

    public static getCity(googleAddress: any): string {
        return this.getAddressComponent(googleAddress, 'administrative_area_level_2');
    }

    public static getLandmark(googleAddress: any): string {
        let neighbourhood = this.getAddressComponent(googleAddress, 'neighborhood');
        return neighbourhood;
    }

    public static getPremiseAddress(googleAddress: any): string {
        let subLocality = this.getAddressComponent(googleAddress, 'sublocality');
        let premise = this.getAddressComponent(googleAddress, 'premise');
        return ( premise ? (premise + ', ')  : '') + (subLocality ? subLocality: '');
    }
    


    private static getAddressComponent(googleAddress: any, comonentTypeName): string {
        if (googleAddress && googleAddress.address_components && googleAddress.address_components.length > 0) {
     
            let pinList = googleAddress.address_components.filter(x => {
                return (x.types.indexOf(comonentTypeName) >-1)
            });

            if(pinList && pinList.length >0){
                return pinList[0].long_name;
            }
        }
        return null;
    }

}
