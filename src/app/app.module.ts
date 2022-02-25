import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FabricCanvasComponent } from './components/fabric-canvas/fabric-canvas.component';
import { HttpClientModule } from "@angular/common/http";
import { WorkAreaControllerViewComponent } from './components/work-area-controller-view/work-area-controller-view.component';

@NgModule({
  declarations: [
    AppComponent,
    FabricCanvasComponent,
    WorkAreaControllerViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
