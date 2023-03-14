import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  depName: string = '';

  constructor() { }

  setDepName(depName: string) {
    this.depName = depName;
  }
}