import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string>()
  categoriesSubscription: Subscription | undefined

  categories: Array<string> | undefined

  menuExpanded: boolean = false;
  isMobile: boolean = false

  constructor(private storeService: StoreService, private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    })
  }

  ngOnInit(): void {
    let categoriesSubscription = this.storeService.getAllCategories().subscribe((response) => {
      this.categories = response
    })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
  }

  toggleMenu() {
    this.menuExpanded = !this.menuExpanded;
}

}
