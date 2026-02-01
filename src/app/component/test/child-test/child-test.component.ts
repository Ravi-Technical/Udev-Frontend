import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-test',
  imports: [],
  templateUrl: './child-test.component.html',
  styleUrl: './child-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildTestComponent implements OnInit, OnChanges {

  @Input() user!: { name: string };

  ngOnInit(): void {
    console.log("On IN INt", this.user);
  }

  ngOnChanges(user:SimpleChanges): void {
    console.log("On change", this.user);
    console.log("user", user);

  }

}
