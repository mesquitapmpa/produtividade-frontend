import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "img[appHideMissing]",
})
export class HideImageDirective {
  constructor(private el: ElementRef) {}

  @HostListener("error")
  private onError() {
    this.el.nativeElement.style.display = "none";
  }
}
