import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class SnakbarMessageService {
    constructor(private snakBar: MatSnackBar) { }
    success(message: string) {
        this.snakBar.open(message, "Ok", {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        })
    }
    error(message: string) {
        this.snakBar.open(message, 'X', {
            duration: 3000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
        })
    }

}