import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';
import { Coupon } from '../../types/Coupon.type';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupon.component.html',
  standalone: true,
  imports: [CommonModule, ClipboardModule],
})
export class CouponsComponent {
  @Input()
  coupons!: Coupon[];
}
