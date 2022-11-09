import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(public router: Router) {}


  ngOnInit() { }

  iniciarSesion() {
     this.router.navigate(['/home']);
  }
}

