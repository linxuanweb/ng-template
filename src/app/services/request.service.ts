import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { LocalStorageKey } from '@type/storage.type';
import { Observable, firstValueFrom, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface IRequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    api?: string;
    data?: any;
    params?: HttpParams;
}

export interface ResponseError {
    status: HttpErrorResponse['status'];
    body: {
        code: number;
        message: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class RequestService {
    constructor(private http: HttpClient) {}

    sendRequest$<T>(requestOptions: IRequestOptions): Observable<T> {
        const host = environment.apiHost;

        const url = `${host}${requestOptions.url}`;

        return this.http
            .request<T>(requestOptions.method, url, {
                body: requestOptions.data ? requestOptions.data : null,
                params: requestOptions.params ?? {},
            })
            .pipe(catchError((error) => this.handleError(error)));
    }

    sendAuthorizedRequest$<T>(requestOptions: IRequestOptions): Observable<T> {
        const host = environment.apiHost;

        const url = `${host}${requestOptions.url}`;

        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: localStorage.getItem(LocalStorageKey.TOKEN) ?? '',
            }),
        };

        switch (requestOptions.method) {
            case 'GET':
                return this.http.get<T>(url, httpOptions).pipe(catchError((error) => this.handleError(error)));
            case 'DELETE':
                return this.http.delete<T>(url, httpOptions).pipe(catchError((error) => this.handleError(error)));
            case 'POST':
                return this.http.post<T>(url, requestOptions.data, httpOptions).pipe(catchError((error) => this.handleError(error)));
            case 'PUT':
                return this.http.put<T>(url, requestOptions.data, httpOptions).pipe(catchError((error) => this.handleError(error)));
        }
    }

    sendRequest<T>(requestOptions: IRequestOptions): Promise<T> {
        return firstValueFrom(this.sendRequest$<T>(requestOptions));
    }
    sendAuthorizedRequest<T>(requestOptions: IRequestOptions): Promise<T> {
        return firstValueFrom(this.sendAuthorizedRequest$<T>(requestOptions));
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(() => ({
            status: error.status,
            body:
                error.status < 500
                    ? error.error
                    : {
                          code: error.error?.code,
                          message: 'Oops! Something went wrong. Please try again.',
                      },
        }));
    }
}
