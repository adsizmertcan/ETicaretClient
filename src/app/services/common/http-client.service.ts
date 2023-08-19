import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private HttpClient: HttpClient,
    @Inject('baseurl') private baseurl: string
  ) {}
  private Url(requestParameters: Partial<RequestParameters>): string {
    return `${
      requestParameters.baseUrl ? requestParameters.baseUrl : this.baseurl
    }/${requestParameters.controller}${
      requestParameters.action ? `/${requestParameters.action}` : ''
    }`;
  }
  get<T>(
    requestParameters: Partial<RequestParameters>,
    id?: string
  ): Observable<T> {
    let url: string = '';
    if (requestParameters.fullEndPoint) url = requestParameters.fullEndPoint;
    else
      url = `${this.Url(requestParameters)}${id ? `/${id}` : ''}${
        requestParameters.queryString
          ? `?  ${requestParameters.queryString} `
          : ''
      }`;
    return this.HttpClient.get<T>(url, { headers: requestParameters.headers });
  }
  post<T>(
    requestParameters: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';
    if (requestParameters.fullEndPoint) url = requestParameters.fullEndPoint;
    else
      url = `${this.Url(requestParameters)}${
        requestParameters.queryString
          ? `?  ${requestParameters.queryString} `
          : ''
      }`;
    return this.HttpClient.post<T>(url, body, {
      headers: requestParameters.headers,
    });
  }
  put<T>(
    requestParameters: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';

    if (requestParameters.fullEndPoint) url = requestParameters.fullEndPoint;
    else
      url = `${this.Url(requestParameters)}${
        requestParameters.queryString
          ? `?  ${requestParameters.queryString} `
          : ''
      }`;

    return this.HttpClient.put<T>(url, body, {
      headers: requestParameters.headers,
    });
  }
  delete<T>(
    requestParameters: Partial<RequestParameters>,
    id: string = ''
  ): Observable<T> {
    let url: string;
    if (requestParameters.fullEndPoint) url = requestParameters.fullEndPoint;
    else
      url = `${this.Url(requestParameters)}/${id}${
        requestParameters.queryString
          ? `?  ${requestParameters.queryString} `
          : ''
      }`;
    return this.HttpClient.delete<T>(url, {
      headers: requestParameters.headers,
    });
  }
}
export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  queryString?: string;

  baseUrl?: string;
  fullEndPoint?: string;
}
