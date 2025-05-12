import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeItem } from '../../interfaces/tree-item';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TreeNodeComponent {
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
      this.selectedIds.includes(child.id) || this.isNodeFullySelected(child)
    );
    return selectedChildren.length > 0 && selectedChildren.length < this.node.children.length;
  }

  toggleSelection(checked: boolean): void {
    if (this.disabled) return;
    const newSelection = [...this.selectedIds];
    this.updateSelection(this.node, checked, newSelection);
    this.checkParentSelection(this.node, newSelection);
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
      node.children.forEach(child => {
        child.parent = node;
        this.updateSelection(child, checked, selection);
      });
    }
  }

  private checkParentSelection(node: TreeItem, selection: string[]): void {
    if (!node.parent) return;

    const allChildrenSelected = node.parent.children?.every(child =>
      selection.includes(child.id) || this.isNodeFullySelected(child)
    );

    if (allChildrenSelected) {
      if (!selection.includes(node.parent.id)) {
        selection.push(node.parent.id);
      }
    } else {
      const index = selection.indexOf(node.parent.id);
      if (index > -1) {
        selection.splice(index, 1);
      }
    }

    this.checkParentSelection(node.parent, selection);
  }

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleSelection(checked);
  }

  hasChildren(): boolean {
    return !!(this.node.children && this.node.children.length > 0);
  }
}
