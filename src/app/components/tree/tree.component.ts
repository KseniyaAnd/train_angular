import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeItem } from '../../interfaces/tree-item';
import { TreeNodeComponent } from '../tree-node/tree-node.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
  standalone: true,
  imports: [CommonModule, TreeNodeComponent, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeComponent),
      multi: true
    }
  ]
})
export class TreeComponent implements ControlValueAccessor {
  @Input() data: TreeItem[] = [];

  selectedIds: string[] = [];
  disabled = false;
  search: string = '';

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string[]): void {
    this.selectedIds = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    this.disabled = state;
  }

  onSelectionChange(newSelection: string[]): void {
    console.log(newSelection);
    this.selectedIds = newSelection;
    this.onChange(newSelection);
    this.onTouched();
  }
}
