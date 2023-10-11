import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private userEmailSource = new BehaviorSubject<string>('');
  currentUserEmail = this.userEmailSource.asObservable();

  constructor() { }


  setUserEmail(email: string) {
    this.userEmailSource.next(email);
  }
}


