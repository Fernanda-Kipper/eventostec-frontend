import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Coupon } from '../types/Coupon.type';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly APIurl = `${environment.API}`;

  constructor(private http: HttpClient) {}

  createEvent(data: Coupon, eventId: string) {
    return this.http.post(`${this.APIurl}/api/coupon/event/${eventId}`, data);
  }
}
