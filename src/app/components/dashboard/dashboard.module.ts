import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '@pipes';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-volumes/search-bar/search-bar.component';
import { SearchVolumesComponent } from './search-volumes/search-volumes.component';
import { VolumeItemResultComponent } from './search-volumes/volume-item-result/volume-item-result.component';
import { VolumeItemComponent } from './search-volumes/volume-item/volume-item.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FooterComponent } from './footer/footer.component';

const routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: SearchVolumesComponent },
      { path: 'wishlist', component: WishlistComponent }
    ]
  }
];
@NgModule({
  declarations: [
    DashboardComponent,
    SearchVolumesComponent,
    VolumeItemComponent,
    VolumeItemResultComponent,
    WishlistComponent,
    WishlistComponent,
    HeaderComponent,
    SearchBarComponent,
    TruncatePipe,
    FooterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [BsModalRef],
  entryComponents: [VolumeItemComponent]
})
export class DashboardModule {}
