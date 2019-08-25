import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Volume } from 'src/app/models/volume.interface';

import { VolumeItemComponent } from '../volume-item/volume-item.component';

@Component({
  selector: 'app-volume-item-result',
  templateUrl: './volume-item-result.component.html',
  styleUrls: ['./volume-item-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumeItemResultComponent implements OnInit {
  @Input() volume: Volume;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {}

  /**
   * Show a modal with book's extended details.
   */
  showVolumeDetails() {
    const initialState = {
      volume: this.volume
    };
    this.bsModalRef = this.modalService.show(VolumeItemComponent, {
      initialState
    });
    this.bsModalRef.setClass('modal-lg');
  }
}
