import {Component, OnInit, OnDestroy} from '@angular/core';
import {Todo} from '../_interface/todo';
import { EventPing } from '../_interface/eventping';
import { DataService } from '../_service/data.service';
import { Subscription } from 'rxjs';

import {DragulaModule, DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit, OnDestroy {

  public toDoShow: boolean;
  public toDoDoneShow: boolean;

  public $todos: Todo[];
  public $todosDone: Todo[];

  public subs = new Subscription();

  constructor(
    public _dataService: DataService,
    public _dragulaService: DragulaService
  ) {
    this.toDoShow = true;
    this.toDoDoneShow = false;

    this.$todos = [];
    this.$todosDone = [];

    this.loadData();

    this._dragulaService.createGroup('todos', {
      removeOnSpill: false,
    });

    this.subs.add(_dragulaService.drop('todos')
      .subscribe(({ el }) => {
        this.position();
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public position(): void {
    console.log(`%cFUNC: position()`);
    let position = 0;
    this.$todos.forEach((toDo: Todo) => {
      position += 1;
      toDo.position = position;
      this._dataService.putToDo(toDo).subscribe((data: Todo) => {
        console.log(`%cSUC: ${data.label} wurde neu positioniert.`, `color: green;`)
      }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red;`)
      });
    });
  }

  public loadData(): void {
    this.$todos = [];
    this.$todosDone = [];
    this._dataService.getToDo().subscribe((data: Todo[]) => {
      data.forEach((toDo: Todo) => {
        if (toDo.status) {
          this.$todosDone.push(toDo)
        } else {
          this.$todos.push(toDo)
        }
      });
      this.$todos.sort((a, b) => {
        // @ts-ignore
        return a.position - b.position;
      })
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`)
    });
}

  public create(event: Todo): void {
    event.position = this.$todos.length + 1;
    this._dataService.postToDO(event).subscribe((data: Todo) => {
      console.log(`%cSUC: "${data.label}" wurde erfolgreich erstellt.`, `color: green; font-size: 12px;`);
      this.$todos.push(data);
      this.position();
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`)
    })
  }

  public update(event: EventPing): void {
      if ('check' === event.label) {
        console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green`);
        if (!event.object.status) {
          this.$todosDone.splice(this.$todosDone.indexOf(event.object), 1);
          this.$todos.push(event.object);
        } else {
          this.$todos.splice(this.$todos.indexOf(event.object), 1);
          this.$todosDone.push(event.object);
        }
      }

      if ('delete' === event.label){
        console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green`);
        if (event.object.status) {
          this.$todosDone.splice(this.$todosDone.indexOf(event.object), 1)
        } else {
          this.$todos.splice(this.$todos.indexOf(event.object), 1)
        }
      }

      if ('label' === event.label) {
        console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green`);
        if (event.object.status) {
          this.$todosDone.forEach((toDo: Todo) => {
            if (toDo.id === event.object.id) {
              toDo.label = event.object.label;
            }
          });
        } else {
          this.$todos.forEach((toDo: Todo) => {
            if (toDo.id === event.object.id) {
              toDo.label = event.object.label;
            }
          });
        }
      }
      console.log(this.$todos)
  }

}
