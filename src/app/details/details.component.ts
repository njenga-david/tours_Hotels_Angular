import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="listing-heading">Welcome and enjoy</h2>
              </section>

      <section class="listing-apply">
        <h2 class="section-heading">Fill  in the details to proceed the booking</h2>
        <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
          <label for="id-number">ID Number</label>
          <input id="id-number" type="text" formControlName="idNumber">

          <label for="resident">Resident</label>
          <input id="resident" type="text" formControlName="resident">

          <label for="booking-date">Booking Date</label>
          <input id="booking-date" type="date" formControlName="bookingDate">

          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    idNumber: new FormControl(''),
    resident: new FormControl(''),
    bookingDate: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.idNumber ?? '',
      this.applyForm.value.resident ?? '',
      this.applyForm.value.bookingDate ?? ''
    );
  }
}
