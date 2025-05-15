import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuVisibleSubject = new BehaviorSubject<boolean>(true);

  get MenuVisible$():Observable<boolean>{
    return this.menuVisibleSubject.asObservable();
  }

  toggleMenu(): void {
    const currentVisibility = this.menuVisibleSubject.value;
    this.menuVisibleSubject.next(!currentVisibility);
  }
}
