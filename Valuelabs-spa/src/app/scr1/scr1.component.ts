
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-scr1',
  templateUrl: './scr1.component.html',
  styleUrls: ['./scr1.component.css']
})
export class Scr1Component implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl =photoUrl);
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.toastr.success('Welcome buddy!!');
    },
    error => {
      this.toastr.error(error);
    }, () => {
      this.router.navigate(['/colleagues']);
    }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.toastr.success('Adios Amigo :)');
    this.authService.decodedToken= null;
    this.authService.currentUser = null;
    this.router.navigate(['/home']);
  }
}
