import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Make a Reservation</h2>
    <form (ngSubmit)="addReservation()">
      <label>
        Name:
        <input [(ngModel)]="name" name="name" required>
      </label>
      <label>
        Area:
        <select [(ngModel)]="selectedArea" name="area" required>
          <option *ngFor="let area of conservationAreas" [value]="area">{{area}}</option>
        </select>
      </label>
      <label>
        Time Slot:
        <select [(ngModel)]="selectedSlot" name="slot" required>
          <option *ngFor="let slot of timeSlots" [value]="slot">{{slot}}</option>
        </select>
      </label>
      <button type="submit">Reserve</button>
    </form>

    <h3>Reservations:</h3>
    <ul>
      <li *ngFor="let r of reservations">
        {{r.name}} reserved {{r.area}} for {{r.timeSlot}}
      </li>
    </ul>
  `
})
export class ReservationComponent {
  name = '';
  selectedArea = '';
  selectedSlot = '';
  conservationAreas = ['Green Lake', 'Blue Forest', 'Sunrise Peak', 'Moonlight Bay'];
  timeSlots = ['9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM'];
  reservations: {name: string; area: string; timeSlot: string}[] = [];

  addReservation() {
    if(this.name && this.selectedArea && this.selectedSlot){
      this.reservations.push({
        name: this.name,
        area: this.selectedArea,
        timeSlot: this.selectedSlot
      });
      this.name = '';
      this.selectedArea = '';
      this.selectedSlot = '';
    }
  }
}
