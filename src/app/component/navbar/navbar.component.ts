import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SupaService } from 'src/app/service/supa.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private auth: SupaService, private router: Router) {}

  async logOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.router.navigate(['/']);
    }catch (err) {
      console.log(err);
      
    }
  }
}

