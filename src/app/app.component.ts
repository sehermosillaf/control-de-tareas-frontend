import { Component } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router:Router) {}


  ngOnInit() { }

  iniciarSesion() {
     this.router.navigate(["/home"])
  }
}

