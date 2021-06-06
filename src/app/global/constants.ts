import { HttpHeaders } from "@angular/common/http";

export class Constants {
    public static headers = new HttpHeaders()
    .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Access-Control-Allow-Headers', '*')
    // .set('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS')
    // .set('Access-Control-Expose-Headers', 'Content-Disposition')
    // .set('Authorization',sessionStorage.getItem('token')
    
    // );
}
