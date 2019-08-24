import { Component, OnInit, Input } from '@angular/core';
import { Volume } from 'src/app/models/volume.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { VolumeItemComponent } from '../volume-item/volume-item.component';

@Component({
  selector: 'app-volume-item-result',
  templateUrl: './volume-item-result.component.html',
  styleUrls: ['./volume-item-result.component.scss']
})
export class VolumeItemResultComponent implements OnInit {
  @Input() volume: Volume;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  showVolumeDetails() {
    const initialState = {
      volume: this.volume
    };

    this.bsModalRef = this.modalService.show(VolumeItemComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

}
