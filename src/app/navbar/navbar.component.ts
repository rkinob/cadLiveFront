import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sessionStorageUtils } from '../utils/sessionStorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router: Router, private _sessionStorageUtils: sessionStorageUtils) { }

  ngOnInit(): void {
  }
  navbarOpen = false;

  logout(): void {
    this._sessionStorageUtils.limpar_sessao();
    this._router.navigate(['/login']);


  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


}
