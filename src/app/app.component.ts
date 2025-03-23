import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TreeComponent} from "./components/tree/tree.component";
import {TreeItem} from "./interfaces/tree-item";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, TreeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  data: TreeItem[] = [
    {
      id: '1',
      name: 'Узел 1',
      children: [
        {
          id: '1.1',
          name: 'Подузел 1.1',
          children: [
            { id: '1.1.1', name: 'Подузел 1.1.1' },
            { id: '1.1.2', name: 'Подузел 1.1.2' },
          ],
        },
        { id: '1.2', name: 'Подузел 1.2' },
      ],
    },
    {
      id: '2',
      name: 'Узел 2',
      children: [
        { id: '2.1', name: 'Подузел 2.1' },
        { id: '2.2', name: 'Подузел 2.2' },
      ],
    },
  ];
}
