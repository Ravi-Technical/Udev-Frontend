import { Component } from '@angular/core';
import { ChildTestComponent } from './child-test/child-test.component';

@Component({
  selector: 'app-test',
  imports: [ChildTestComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  data = { name: 'Ravi' };

  changeTest() {
    this.data.name = "Ravi Tech";
  }
}
