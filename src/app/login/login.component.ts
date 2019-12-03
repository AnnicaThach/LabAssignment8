import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../localStorageService';
import { Local } from 'protractor/built/driverProviders';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser = { username: '', password: '' };
  localStorageService: LocalStorageService<IUser>;
  currentUser: IUser = null;
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {
  }

  login(user: IUser) {
    console.log('from login user:', user);
    const defaultUser: IUser = { username: 'athach', password: 'annica123' };
    if (user.username != null && user.password != null) {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        // log the user in
        // store user in localStorage
        this.localStorageService.saveItemsToLocalStorage(user);
        // navigate to contacts page
        this.router.navigate(['contacts', user]);
      } else {
        if (user.username === '' && user.password === '') {
          this.toastService.showToast('warning', 2000, 'Login failed! Please enter username and password.');
        }
        // show error toast to user
      }} else {
      this.toastService.showToast('warning', 2000, 'Login failed! Please enter username and password.');
    }
  }
}

