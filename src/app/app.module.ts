import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MyDatePickerModule } from 'mydatepicker';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from './shared/app.service';
import { ChartModule } from 'primeng/chart';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {GrowlModule} from 'primeng/growl';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MyDatePickerModule, FormsModule, BrowserAnimationsModule, HttpModule,ChartModule,ChartsModule,GrowlModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
