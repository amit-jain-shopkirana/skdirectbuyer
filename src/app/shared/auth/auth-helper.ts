import {  HttpEvent, HttpResponse } from "@angular/common/http";
declare var AES256;
export class AuthHelper {
    public static decrypt(event: any): any {
        if (event instanceof HttpResponse && event.status !== 201) {
            if (event.url.indexOf("/api") > -1) {
                var today = new Date();
                var n = (today.getMonth() + 1).toString();
                var width = 2;
                var z = '0';
                var month = n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
                var day = today.getDate().toString();
                if (day.length == 1) {
                    day = '0' + day;
                }
                var passphras = "201907221201";
                passphras = today.getFullYear() + "" + month + "" + day + "1201";
                var data = JSON.parse(AES256.decrypt(event.body.Data, passphras));
                event.body.Data = data;
                event = event.clone({ body: event.body.Data });
            }
        }
        return event;
    }
}
