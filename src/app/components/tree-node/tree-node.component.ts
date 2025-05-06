import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeItem, ITreeComponent } from '../../interfaces/tree-item';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TreeNodeComponent implements ITreeComponent {
  @Input() node!: TreeItem;
  @Input() level: number = 0;
  @Input() selectedIds: string[] = [];
  @Input() disabled = false;
  @Output() selectionChange = new EventEmitter<string[]>();

  get id(): string {
    return this.node.id;
  }

  get isSelected(): boolean {
    if (!this.node.children || this.node.children.length === 0) {
      return this.selectedIds.includes(this.node.id);
    }

    return this.node.children.every(child =>
      this.selectedIds.includes(child.id) ||
      this.isNodeFullySelected(child)
    );
  }

  private isNodeFullySelected(node: TreeItem): boolean {
    if (!node.children || node.children.length === 0) {
      return this.selectedIds.includes(node.id);
    }

    return node.children.every(child =>
      this.selectedIds.includes(child.id) ||
      this.isNodeFullySelected(child)
    );
  }


  get isIndeterminate(): boolean {
    if (!this.node.children?.length) return false;
    const selectedChildren = this.node.children.filter(child =>
      this.selectedIds.includes(child.id)
    );
    return selectedChildren.length > 0 && selectedChildren.length < this.node.children.length;
  }

  toggleSelection(checked: boolean): void {
    if (this.disabled) return;
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

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleSelection(checked);
  }

  hasChildren(): boolean {
    return !!(this.node.children && this.node.children.length > 0);
  }
}
