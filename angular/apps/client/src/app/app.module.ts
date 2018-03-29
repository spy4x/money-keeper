import {NgModule} from '@angular/core';
import {CoreModule} from './+core/core.module';
import {AppComponent} from './app.component';
import {SharedModule} from './+shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
  ],
  providers: [],
  entryComponents: [
    ...SharedModule.getEntryComponents()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// throw new Error('123');
