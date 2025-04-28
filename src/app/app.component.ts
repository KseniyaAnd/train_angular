import {Component, signal} from '@angular/core';
import { TreeComponent } from './components/tree/tree.component';
import { TreeItem } from './interfaces/tree-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  selectedIds = signal<string[]>([]);
}
