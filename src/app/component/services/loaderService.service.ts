import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
    providedIn: 'root'
})

export class LoaderService {
    isLoading = signal<boolean>(false);
    show() { this.isLoading.set(true); }
    hide() { this.isLoading.set(false); }
}