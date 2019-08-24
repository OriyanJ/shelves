import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { SearchVolumesComponent } from "./search-volumes/search-volumes.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VolumeItemComponent } from "./search-volumes/volume-item/volume-item.component";
import { VolumeItemResultComponent } from "./search-volumes/volume-item-result/volume-item-result.component";
import { WishlistComponent } from './wishlist/wishlist.component';
import { HeaderComponent } from './header/header.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SearchBarComponent } from "./search-volumes/search-bar/search-bar.component";
import { TruncatePipe } from "@pipes";

const routes = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', component: SearchVolumesComponent },
            { path: 'wishlist', component: WishlistComponent }
        ]
    }
]
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
        TruncatePipe
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
export class DashboardModule { }