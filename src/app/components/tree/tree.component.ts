import {Component, Input, TemplateRef} from '@angular/core';
import {TreeItem} from "../../interfaces/tree-item";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [
    NgTemplateOutlet,
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css',
  host: {
    '[class]': '"tree-" + treeStyle'
  }
})
export class TreeComponent {
  @Input() data: TreeItem[] = [];
  @Input() itemTemplate!: TemplateRef<any>;
  @Input() level: number = 0;
  @Input() treeStyle: 'gray' | 'yellow' = 'gray';

  hasChildren(item: TreeItem): boolean {
    return item.children! && item.children!.length > 0;
  }

  getIndent(level: number): string {
    return `${level * 20}px`;
  }
}
