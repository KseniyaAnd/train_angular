export interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
  parent?: TreeItem;
}

export interface ITreeComponent {
  id: string;
  isSelected: boolean;
  isIndeterminate: boolean;
  toggleSelection(checked: boolean): void;
}
