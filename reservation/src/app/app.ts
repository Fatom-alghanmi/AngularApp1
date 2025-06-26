import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'Conservation Area Reservation';
  name = '';
  selectedArea = '';
  selectedSlot = '';
  message = '';

  conservationAreas = ['Green Lake', 'Blue Forest', 'Sunrise Peak', 'Moonlight Bay'];
  timeSlots = ['9:00 AM – 12:00 PM', '12:00 PM – 3:00 PM', '3:00 PM – 6:00 PM'];
  displayedColumnsWithActions: string[] = ['name', 'area', 'timeSlot', 'actions'];
  dataSource = new MatTableDataSource<{ name: string; area: string; timeSlot: string }>([]);

  isSlotReserved(area: string, slot: string): boolean {
    return this.dataSource.data.some(r => r.area === area && r.timeSlot === slot);
  }

  onAreaSelect(area: string) {
    if (this.isSlotReserved(area, this.selectedSlot)) {
      this.showMessage(`❌ Time slot '${this.selectedSlot}' is already reserved in '${area}'`);
    } else {
      this.selectedArea = area;
      this.showMessage(`Selected area: ${area}`);
    }
  }

  onSlotSelect(slot: string) {
    if (!this.selectedArea) {
      this.showMessage('⚠️ Please select an area first.');
    } else if (this.isSlotReserved(this.selectedArea, slot)) {
      this.showMessage(`❌ ${slot} is already reserved in ${this.selectedArea}.`);
    } else {
      this.selectedSlot = slot;
      this.showMessage(`Selected time slot: ${slot}`);
    }
  }

  canAddReservation(): boolean {
    return (
      this.name.trim() !== '' &&
      this.selectedArea !== '' &&
      this.selectedSlot !== '' &&
      !this.isSlotReserved(this.selectedArea, this.selectedSlot)
    );
  }

  addReservation() {
    const missingFields = [];

    if (this.name.trim() === '') missingFields.push('your name');
    if (!this.selectedArea) missingFields.push('an area');
    if (!this.selectedSlot) missingFields.push('a time slot');

    if (missingFields.length > 0) {
      this.showMessage(`⚠️ Please enter ${missingFields.join(', ')}.`);
      return;
    }

    if (this.isSlotReserved(this.selectedArea, this.selectedSlot)) {
      this.showMessage(`❌ ${this.selectedSlot} is already reserved in ${this.selectedArea}.`);
      return;
    }

    this.dataSource.data = [
      ...this.dataSource.data,
      {
        name: this.name.trim(),
        area: this.selectedArea,
        timeSlot: this.selectedSlot
      }
    ];

    this.showMessage(`✅ Reservation confirmed for ${this.name} at ${this.selectedArea}, ${this.selectedSlot}`);

    this.name = '';
    this.selectedArea = '';
    this.selectedSlot = '';
  }

  cancelReservation(index: number) {
    const updatedData = [...this.dataSource.data];
    const removed = updatedData.splice(index, 1)[0];
    this.dataSource.data = updatedData;
    this.showMessage(`❗️Canceled reservation for ${removed.name} at ${removed.area}, ${removed.timeSlot}`);
  }

  private showMessage(text: string) {
    this.message = text;
    clearTimeout((this as any)._msgTimeout);
    (this as any)._msgTimeout = setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
