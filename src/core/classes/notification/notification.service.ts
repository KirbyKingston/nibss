import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  alertStatus: BehaviorSubject<{content:string, style:string, type:number, show:boolean}> = new BehaviorSubject<{content:string, style:string, type:number, show:boolean}>({content: 'New notification', style: 'info', type: 0, show:false})

  publishMessages(content:string, style:string, type:number){
    this.alertStatus.next({content:content, style:style, type:0, show:true});
    setTimeout(() => {
      this.dismissMessage();
    }, 5000);
  }    
 
  dismissMessage(){
    this.alertStatus.next({content:'', style:'', type:0, show:false})
  }
}
