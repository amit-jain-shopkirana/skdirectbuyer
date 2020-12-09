import { AppHomeWidgetConfigurationDc } from './app-home-widget-configuration-dc';
import { TopSellerDc } from './top-seller-dc';

export interface AppHomeWidgetDc
{
    Id: number;
    AppHomeId: number;
    WidgetTypeMasterId: number;
    WidgetTypName: string;
    Sequence: number;
    IsSingleWidgetOnly: boolean;
    WidgetConfList: AppHomeWidgetConfigurationDc[];
    TopSellerList: TopSellerDc[];
    isDragEnter?: boolean; // client side property
}