import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


interface optionsType {
  visible: boolean,
  view: {
    name: string,
    username?: string,
    password?: string,
    email?: string
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public authService: AuthService) { }
  options: optionsType = {
    visible: false,
    view: { name: 'login', username: '', password: '', email: '' }
  }

  loggin(): void {
    this.authService.setSession(this.options.view.username!, this.options.view.password!);
  }

  signup(): void {
    this.authService.signup(this.options.view.email!,this.options.view.username!, this.options.view.password!);
  }

  ngOnInit(): void {
    this.authService.signupped.subscribe({
      next: () => {
        this.options.view = { name: 'login', username: '', password: '', email: '' }
      }
    })

    this.authService.tokenUpdated.subscribe({
      next: () => {
        this.options.view = { name: 'options', username: '', password: '', email: '' };
      }
    })
  }
}

