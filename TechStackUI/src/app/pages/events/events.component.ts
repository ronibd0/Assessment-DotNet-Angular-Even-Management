import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechStackService } from 'src/app/appService/tech-stack.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventForm: FormGroup;

  guestList: any;
  event: any;
  updatebtn: boolean = false;

  selectedList: any[] = [];
  updateId: number = 0;
  guestNamevalid: any;

  constructor(
    private formBuilder: FormBuilder,
    private ApiService: TechStackService<any>
  ) {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required,Validators.minLength(3)],
      eventDate: ['', Validators.required],
      listOfGuest: [[], Validators.required ],
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadGuests();
  }

  createForm(): void {}

  loadGuests(): void {
    this.ApiService.getAll('Guest').subscribe((data) => {
      this.guestList = data;
    });
  }
  loadEvents(): void {
    this.ApiService.getAll('Event').subscribe((data) => {

      this.event = data;
    });
  }

  onSubmit(): void {

    if (this.eventForm.controls['listOfGuest'].value >2) {

    }
    let dt  = JSON.parse( this.eventForm.controls['listOfGuest'].value).length
    if (dt>= 2) {

        let eventData = this.eventForm.value;
        console.log(eventData);

        this.ApiService.create('Event', eventData).subscribe({
          next: (res) => {
            console.log('success', res);
            this.eventForm.reset();
            document.getElementById('closebtn')?.click();
            this.loadEvents();
          },
          error: (err) => {
            console.log('error', err);
          },
        });

    } else {
      this.guestNamevalid = dt;

    }

  }
  reset() {
    this.eventForm.reset();
  }
  editEvent(data: any) {

    this.updatebtn = true;
    document.getElementById('openbtn')?.click();
    const selectedEvent = data;
    this.updateId = data.eventID;
    this.eventForm.patchValue({
      eventName: selectedEvent.eventName,
      eventDate: selectedEvent.eventDate,
      listOfGuest: selectedEvent.listOfGuest,
    });
  }

  deleteEvent(datadex: any) {

    let eventID = datadex.eventID;
    this.ApiService.delete('Event', eventID).subscribe(() => {
      this.loadEvents();
    });
  }

  selectguest(data: any, select: any) {

    let fullname = data.firstName + ' ' + data.lastName;
    const newgest = {
      id: data.guestID,
      name: fullname,
    };

    localStorage.setItem('multiguest', JSON.stringify(newgest));
  }
  selectItem(checked: any, item: any) {

    const newitem = {
      id: item.guestID,
      name: item.firstName + ' ' + item.lastName,
    };
    if (checked.checked) {
      this.selectedList.push(newitem);
      console.log(this.selectedList);
    } else {
      const index = this.selectedList.findIndex((x) => x.id == newitem.id);
      // const index = this.selectedList.indexOf(newitem);
      if (index !== -1) {
        this.selectedList.splice(index, 1);
      }
    }

    this.eventForm.controls['listOfGuest'].setValue(
      JSON.stringify(this.selectedList)
    );
  }
  parseData(data: string): any[] {
    return JSON.parse(data);
  }

  Updateevet() {
    console.log('this ev data', this.eventForm.value);
    this.eventForm.controls['listOfGuest'].setValue(
      JSON.stringify(this.selectedList)
    );

      this.ApiService.update(
        'Event',
        this.updateId,
        this.eventForm.value
      ).subscribe({
        next: (res) => {
          if (res == null) {
            document.getElementById('closebtn')?.click();
            console.log(res);
            this.updatebtn = false;
            this.loadEvents();
          }
        },
        error: (err) => {
          console.log(err);
          this.updatebtn = false;
        },
      });

  }

  get eventName(){
    return this.eventForm.controls['eventName'];
  }
  get eventDate(){
    return this.eventForm.controls['eventDate'];
  }

}
