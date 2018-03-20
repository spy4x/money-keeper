export interface Group {
  id?: string;
  name: string;
  isPersonal: boolean;
  roles: {
    [key:string]: 'owner' | 'write' | 'read'
  }
}
