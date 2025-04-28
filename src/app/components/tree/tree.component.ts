// переписать на сигналы
// cva
// сначала паттерн

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeItem } from '../../interfaces/tree-item';
import { TreeNodeComponent } from '../tree-node/tree-node.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  standalone: true,
  imports: [CommonModule, TreeNodeComponent]
})
export class TreeComponent {
  @Input() data: TreeItem[] = [];
  @Input() selectedIds: string[] = [];
  @Input() treeStyle: 'gray' | 'yellow' = 'gray';
  @Input() level: number = 0;
  @Output() selectedIdsChange = new EventEmitter<string[]>();

  onSelectionChange(newSelection: string[]): void {
    this.selectedIdsChange.emit(newSelection);
  }
}
