import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ServiceService {
    user = {};
    token = "";
    userId= "";

    constructor(private http: HttpClient) {}

    public url = environment.url;

    saveUser(user) {
        localStorage.setItem("user",  JSON.stringify(user));
        localStorage.setItem("token",  user.id);
        localStorage.setItem("userId",  user.userId);
        this.user = Object(user)["userId"];
        this.token = Object(user)["id"];
    }

    loginUser(user) {
        console.log(user)
        return this.http.post(this.url + "AppUsers/login?include=user", user).toPromise();
    }

    logoutUser() {
        return this.http.post(this.url + "AppUsers/logout?access_token=" + localStorage.getItem("token"), { accessToken: localStorage.getItem("token") }).toPromise();
    }

    getProductsMexico(filter){
        return this.http.get(this.url + "/MexicoProducts/" + filter + "access_token=" + localStorage.getItem("token")).toPromise();
    }

    createIndividualProduct(values){
        return this.http.post(this.url + "/MexicoProducts?access_token=" + localStorage.getItem("token"), values).toPromise();
    }

    patchIndividualProduct(id, values){
        return this.http.patch(this.url + "/MexicoProducts/" + id + "?access_token=" + localStorage.getItem("token"), values).toPromise();
    }

    deleteIndividualProduct(id){
        return this.http.delete(this.url + "/MexicoProducts/" + id + "?access_token=" + localStorage.getItem("token")).toPromise();
    }
}