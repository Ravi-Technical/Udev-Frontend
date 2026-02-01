import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './old-component-routing.module';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { ChildTestComponent } from './test/child-test/child-test.component';


@NgModule({
  declarations: [
  ],
  imports: [
    TestComponent,
    ChildTestComponent,
    CommonModule,
    HomeComponent,
    ComponentRoutingModule,
  ]
})
export class ComponentModule { }
