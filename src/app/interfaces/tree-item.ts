export interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
  parent?: TreeItem;
}
