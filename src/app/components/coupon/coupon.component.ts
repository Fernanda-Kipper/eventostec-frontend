import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupon.component.html',
  standalone: true,
  imports: [CommonModule, ClipboardModule],
})
export class CouponsComponent {
  @Input()
  coupons!: { discount: number; validUntil: string; code: string }[];
}
