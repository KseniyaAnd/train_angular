import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './components/tree/tree.component';
import { TreeItem } from './interfaces/tree-item';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TreeComponent, FormsModule, ReactiveFormsModule],
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

  treeControl = new FormControl<string[]>(['1.1.1', '1.2']);

  disabled = false;

  toggleDisabled(): void {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.treeControl.disable();
    } else {
      this.treeControl.enable();
    }
  }
}
