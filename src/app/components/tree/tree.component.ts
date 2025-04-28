// переписать на сигналы
// cva
// сначала паттерн

import {Component, Input, output, model, input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TreeItem } from '../../interfaces/tree-item';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TreeComponent {
  data = input<TreeItem[]>([]);
  selectedIds = model<string[]>([]);
  treeStyle = input<'gray' | 'yellow'>('gray');
  level = input(0);

  selectionChange = output<string[]>();

  isChecked(item: TreeItem): boolean {
    return this.selectedIds().includes(item.id);
  }

  hasChildren(item: TreeItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  onCheckboxChange(item: TreeItem, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleCheckbox(item, checked);
  }

  toggleCheckbox(item: TreeItem, checked: boolean): void {
    if (checked) {
      this.addSelection(item);
    } else {
      this.removeSelection(item);
    }

    this.selectionChange.emit([...this.selectedIds()]);
  }

  addSelection(item: TreeItem): void {
    if (!this.selectedIds().includes(item.id)) {
      this.selectedIds.update(ids => [...ids, item.id]);
    }

    if (item.children) {
      item.children.forEach(child => this.addSelection(child));
    }
  }

  removeSelection(item: TreeItem): void {
    this.selectedIds.update(ids => ids.filter(id => id !== item.id));

    if (item.children) {
      item.children.forEach(child => this.removeSelection(child));
    }
  }

  isIndeterminate(item: TreeItem): boolean {
    if (item.children) {
      const selectedChildren = item.children.filter(child => this.selectedIds().includes(child.id));
      return selectedChildren.length > 0 && selectedChildren.length < item.children.length;
    }
    return false;
  }
}
