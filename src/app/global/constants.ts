import { HttpHeaders } from "@angular/common/http";

export class Constants {
    public static headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
}
