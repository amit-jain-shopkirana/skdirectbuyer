import { AppHomeWidgetDc } from './app-home-widget-dc';

export interface AppHomeDc
{
    Id: number;
    CityMastersId: number;
    CityName: string;
    Name: string;
    WidgetList: AppHomeWidgetDc[];
}