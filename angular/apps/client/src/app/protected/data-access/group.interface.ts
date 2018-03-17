export interface Group {
  id?: string;
  name: string;
  roles: {
    [key:string]: 'owner' | 'write' | 'read'
  }
}
