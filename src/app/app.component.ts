import { Component, ViewContainerRef } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { NgForm } from '@angular/forms';
import { AppService } from './shared/app.service';
import { error } from 'util';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  journalTitle: any;
  searchQuery: string;
  publicationsDetails: any;
  selectedJournal: Message[] = [];
  queryObject = '';
  fromDate: any = {};
  toDate: any = {};
  showChart: boolean = false;
  fromDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    yearSelector: true,
  };
  toDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    yearSelector: true,
    disableUntil: { year: 2018, month: 3, day: 1 }
  };

  chartData = {
    labels: [],
    datasets: [
      {
        label: 'Publication per year',
        backgroundColor: '#42A5F5',
        borderColor: '#1E88E5',
        barThickness: '5px',
        data: []
      }

    ]
  }
  constructor(private appservice: AppService) {
  }
  /**
   * Method to handle the form submit 
   * @param {NgForm} publicationQuery 
   * @memberof AppComponent
   */
  onSubmit(publicationQuery: any) {
    if (this.fromDate.date !== undefined && this.toDate.date !== undefined) {
      if (this.fromDate.date !== null || this.toDate.date !== null) {
        this.queryObject = this.searchQuery + ' AND PUB_YEAR:[' + this.fromDate.date.year + '+ TO + ' + this.toDate.date.year + ']';
      }
    } else {
      this.queryObject = this.searchQuery;
    }
    this.appservice.getPublications(this.queryObject).subscribe(publications => {
      for (var key in publications) {
        var obj = publications[key];
        this.chartData.labels.push(obj.year);
        this.chartData.datasets[0].data.push(obj.noOfPublication);
        this.publicationsDetails = publications;
      }
      this.showChart = true;
      this.searchQuery = '';
      this.fromDate = '';
      this.toDate = '';
    }, err => { console.log(err) });

  }
  /**
   * To handle the date change event in the date picker
   * @param {IMyDateModel} event 
   * @memberof AppComponent
   */
  onDateChanged(event: IMyDateModel) {
    this.toDateOptions.disableUntil = { year: event.date.year, month: event.date.month, day: event.date.day }
    this.toDateOptions = JSON.parse(JSON.stringify(this.toDateOptions));
  }
  /**
   * To handle the click event in the bar chart 
   * @param {*} event 
   * @memberof AppComponent
   */
  selectData(event: any) {
    this.journalTitle = this.publicationsDetails[event.element._model.label].PublicationTitle;
    this.showSuccess();
  }
  /**
   *Message method 
   * @memberof AppComponent
   */
  showSuccess() {
    this.selectedJournal.push({ severity: 'success', summary: 'Journal Details', detail: 'Title : ' + this.journalTitle });
  }

}

