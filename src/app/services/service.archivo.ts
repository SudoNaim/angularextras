import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import Archivo from '../models/archivo';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ServiceArchivo {
    url: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    async uploadFileAsync(archivo: Archivo): Promise<any> {
        let request = "api/TestingFiles"; 
        
        let json = JSON.stringify(archivo);
        let header = new HttpHeaders().set('Content-Type', 'application/json');
        
        return firstValueFrom(
            this.http.post(this.url + request, json, { headers: header })
        );
    }
}