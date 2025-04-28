import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeItem } from '../../interfaces/tree-item';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TreeNodeComponent {
  @Input() node!: TreeItem;
  @Input() level: number = 0;
  @Input() treeStyle: 'gray' | 'yellow' = 'gray';
  @Input() selectedIds: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();

  isChecked(): boolean {
    return this.selectedIds.includes(this.node.id);
  }

  hasChildren(): boolean {
    return !!(this.node.children && this.node.children.length > 0);
  }

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleCheckbox(checked);
  }

  toggleCheckbox(checked: boolean): void {
    const newSelection = [...this.selectedIds];
    this.updateSelection(this.node, checked, newSelection);
    this.selectionChange.emit(newSelection);
  }

  private updateSelection(node: TreeItem, checked: boolean, selection: string[]): void {
    if (checked) {
      if (!selection.includes(node.id)) {
        selection.push(node.id);
      }
    } else {
      const index = selection.indexOf(node.id);
      if (index > -1) {
        selection.splice(index, 1);
      }
    }

    if (node.children) {
      node.children.forEach(child => this.updateSelection(child, checked, selection));
    }
  }

  isIndeterminate(): boolean {
    if (this.node.children) {
      const selectedChildren = this.node.children.filter(child => this.selectedIds.includes(child.id));
      return selectedChildren.length > 0 && selectedChildren.length < this.node.children.length;
    }
    return false;
  }
}
