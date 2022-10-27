import {
  Component,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  ViewChild,
  Inject,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const colors: any = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('modalContent')
  modalReference: any;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  dayEvents: CalendarEvent[] = [];
  message: any = '';
  apiResponse: any = [
    {
      "_id": "625132878ac3c83b6a3cd432",
      "ClientID": 2000052,
      "Owner": 513,
      "FirstName": "Heena",
      "MiddleName": null,
      "LastName": "Gupta",
      "AppointmentDate": "2022-06-27T08:00:00.000Z",
      "AppointmentTime": "00:32",
      "Reason": "need for demo",
      "updated_at": "2022-06-13T13:33:53.825000Z",
      "created_at": "2022-04-09T07:15:19.859000Z"
    },
    {
      "_id": "625132878ac3c83b6a3cd433",
      "ClientID": 2000052,
      "Owner": 513,
      "FirstName": "Heena",
      "MiddleName": null,
      "LastName": "Gupta",
      "AppointmentDate": "2022-06-27T08:13:00.000Z",
      "AppointmentTime": "00:50",
      "Reason": "Interview",
      "updated_at": "2022-06-13T13:33:53.825000Z",
      "created_at": "2022-04-09T07:15:19.859000Z"
    },
    {
      "_id": "6275f964b7b1a1425c2b1972",
      "ClientID": 2000090,
      "Owner": 513,
      "FirstName": null,
      "MiddleName": null,
      "LastName": "test name",
      "AppointmentDate": "2022-06-26T08:00:00.000Z",
      "AppointmentTime": "04:26",
      "Reason": "For DEMO CALL",
      "updated_at": "2022-06-09T12:39:18.268000Z",
      "created_at": "2022-06-07T04:45:24.226000Z"
    },
    {
      "_id": "6272407e31967c5a1e53f012",
      "ClientID": 2000084,
      "Owner": 513,
      "FirstName": "test",
      "MiddleName": "test",
      "LastName": "test",
      "AppointmentDate": "2022-06-20T18:30:00.000Z",
      "AppointmentTime": "19:00",
      "Reason": "testing",
      "updated_at": "2022-06-09T14:31:20.285000Z",
      "created_at": "2022-06-04T08:59:42.394000Z"
    },
    {
      "_id": "627cabd530fd995211074093",
      "ClientID": 2000100,
      "Owner": 513,
      "FirstName": null,
      "MiddleName": null,
      "LastName": "ljj",
      "AppointmentDate": "2022-06-20T08:00:00.000Z",
      "AppointmentTime": "01:30",
      "Reason": "A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal",
      "updated_at": "2022-06-16T09:25:46.386000Z",
      "created_at": "2022-06-12T06:40:21.483000Z"
    },
    {
      "_id": "6275ed05d0a0ce525f20f2c4",
      "ClientID": 2000088,
      "Owner": 513,
      "FirstName": "Q",
      "MiddleName": "three",
      "LastName": "Tester",
      "AppointmentDate": "2022-06-12T18:30:00.000Z",
      "AppointmentTime": "17:08",
      "Reason": "test app",
      "updated_at": "2022-06-07T08:52:27.035000Z",
      "created_at": "2022-06-07T03:52:37.038000Z"
    }
  ]
  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;
  constructor(private modal: NgbModal) {
    console.log(this.events);
    this.createEventsArray();
  }
  ngAfterViewInit(): void {
    this.view = CalendarView.Month;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && events.length != 0)) {
        this.dayEvents = events;
        this.message = '';
        this.modalReference = this.modal.open(this.modalContent, { size: 'lg' });
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // this.refresh.next();
  }


  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.blue,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    // this.refresh.next();
  }

  createEventsArray() {
    let eventsArray = []
    //this function is for creating events array from api response
    this.apiResponse.forEach((element: any, i: any) => {
      var dt = new Date(element.AppointmentDate);
      dt.setHours(dt.getHours() + parseInt(element.AppointmentTime));
      dt.setMinutes(dt.getMinutes() + parseInt(element.AppointmentTime.split(':')[1]));
      let obj = {
        id: element._id,
        title: element.Reason,
        start: new Date(element.AppointmentDate),
        end: dt,
        color: colors.blue,
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
      }
      this.events.push(obj);
    });

  }

  updateEvent(event: any): void {

    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].id == event.id) {
        this.events[i].start = new Date(event.start);
        this.events[i].end = new Date(event.end);
        this.events[i].draggable = false;
        this.message = "Event  Updated successfully";
        break;
      }
    }
    this.modal.dismissAll();
  }

  deleteEvent(event: any): any {
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].id == event.id) {
        this.events.splice(i, 1);
        this.dayEvents.splice(i, 1);
        this.message = "Event  deleted successfully";
        this.modal.dismissAll();
      }
    }
  }
}
