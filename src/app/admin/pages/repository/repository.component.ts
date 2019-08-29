import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../../../services/realtime.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  constructor(private realtimeService: RealtimeService) {
  }

  ngOnInit() {
    this.realtimeService.sendMessage('Hello');
  }

}
