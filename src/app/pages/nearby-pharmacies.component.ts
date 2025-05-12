import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule,CommonModule],
  selector: 'app-nearby-pharmacies',
  templateUrl: './nearby-pharmacies.component.html',
  styleUrls: ['./nearby-pharmacies.component.scss']
})
export class NearbyPharmaciesComponent implements OnInit {
  map: google.maps.Map | undefined;
  mapElement!: HTMLElement;

  pharmacies: any[] = [];
  doctors: any[] = [];

  pharmacyForm: FormGroup;
  doctorForm: FormGroup;

  pharmacySearch: string = '';
  doctorSearch: string = '';

  constructor() {
    this.pharmacyForm = new FormGroup({
      pharmacySearch: new FormControl('')
    });

    this.doctorForm = new FormGroup({
      doctorSearch: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.pharmacyForm.get('pharmacySearch')?.valueChanges.subscribe(() => {
      this.filteredPharmacies();
    });

    this.doctorForm.get('doctorSearch')?.valueChanges.subscribe(() => {
      this.filteredDoctors();
    });
  }

  showMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        this.mapElement = document.getElementById('map')!;
        this.map = new google.maps.Map(this.mapElement, {
          center: userLocation,
          zoom: 20,
        });

        new google.maps.Marker({
          position: userLocation,
          map: this.map,
          title: 'مكانك الحالي',
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        });

        const service = new google.maps.places.PlacesService(this.map);

        this.pharmacies = [];
        service.nearbySearch(
          {
            location: userLocation,
            radius: 5000, 
            type: 'pharmacy',
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              results.forEach((place) => {
                if (!place.geometry?.location) return;

                this.pharmacies.push(place);

                new google.maps.Marker({
                  map: this.map!,
                  position: place.geometry.location,
                  title: `صيدلية: ${place.name}`,
                  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                });
              });
            }
          }
        );

        this.doctors = [];
        service.nearbySearch(
          {
            location: userLocation,
            radius: 6000, 
            type: 'doctor',
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              results.forEach((place) => {
                if (!place.geometry?.location) return;

                this.doctors.push(place);

                new google.maps.Marker({
                  map: this.map!,
                  position: place.geometry.location,
                  title: `دكتور: ${place.name}`,
                  icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                });
              });
            }
          }
        );
      });
    } else {
      alert('المتصفح لا يدعم تحديد الموقع');
    }
  }

  focusOnPlace(place: any) {
    if (place.geometry?.location) {
      this.map?.panTo(place.geometry.location);
      this.map?.setZoom(17);
    }
  }

  filteredPharmacies() {
    return this.pharmacies.filter(pharmacy =>
      pharmacy.name.toLowerCase().includes(this.pharmacyForm.get('pharmacySearch')?.value.toLowerCase())
    );
  }

  filteredDoctors() {
    return this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(this.doctorForm.get('doctorSearch')?.value.toLowerCase())
    );
  }
}
