import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-platform-options',
  templateUrl: './platform-options.component.html',
  styleUrls: ['./platform-options.component.css']
})
export class PlatformOptionsComponent {
  @Input() platforms: string[] = [];
  @Input() ownedPlatforms: string[] = [];
  @Output() platformChange = new EventEmitter<string[]>();

  togglePlatformOwnership(platform: string): void {
    const index = this.ownedPlatforms.indexOf(platform);
    
    if (index > -1) {
      this.ownedPlatforms.splice(index, 1);
    } 
    else{
      this.ownedPlatforms.push(platform);
    }

    this.platformChange.emit(this.ownedPlatforms);
  }
}