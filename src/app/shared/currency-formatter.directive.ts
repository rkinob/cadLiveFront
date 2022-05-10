import { Directive, HostListener, Self, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[currencyFormatter]'
})
export class CurrencyFormatterDirective implements OnDestroy {

  private formatter: Intl.NumberFormat;
  private destroy$ = new Subject();

  constructor(@Self() private ngControl: NgControl) {
    this.formatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
  }

  ngAfterViewInit() {
    this.setValue(this.formatPrice(this.ngControl.value))
    const ngControl = this.ngControl.control;
    if(ngControl)
      ngControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.updateValue.bind(this));
  }

  updateValue(value: string) {
    let inputVal = value || '';
    console.log(inputVal.replace(/[^0-9,]/g, ''));
    this.setValue(!!inputVal ?
      this.validateDecimalValue(inputVal.replace(/[^0-9,]/g, '')) : '');
  }

  @HostListener('focus') onFocus() {
    this.setValue(this.unformatValue(this.ngControl.value));
  }

  @HostListener('blur') onBlur() {
    let value = this.ngControl.value || '';
    !!value && this.setValue(this.formatPrice(value));
  }

  formatPrice(v: any) {
    return this.formatter.format(v);
  }

  unformatValue(v: string) {
    return v.replace(/,/g, '');
  }

  validateDecimalValue(v: any) {
    // Check to see if the value is a valid number or not
    if (Number.isNaN(Number(v))) {
      // strip out last char as this would have made the value invalid
      const strippedValue = v.slice(0, v.length - 1);

      // if value is still invalid, then this would be copy/paste scenario
      // and in such case we simply set the value to empty
      return Number.isNaN(Number(strippedValue)) ? '' : strippedValue;
    }
    return v;
  }

  setValue(v: any) {
    this.ngControl.control!.setValue(v, { emitEvent: false })
  }

  ngOnDestroy() {
    this.setValue(this.unformatValue(this.ngControl.value));
    this.destroy$.next();
    this.destroy$.complete();
  }

}
