import {Component, Input, TemplateRef} from '@angular/core';
import {TreeItem} from "../../interfaces/tree-item";
import {NgStyle, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-tree',
  imports: [
    NgTemplateOutlet,
    NgStyle
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent {
  @Input() data: TreeItem[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() level: number = 0;

  hasChildren(item: TreeItem): boolean {
    return item.children! && item.children!.length > 0;
  }

  getIndent(level: number): string {
    return `${level * 20}px`;
  }
}
