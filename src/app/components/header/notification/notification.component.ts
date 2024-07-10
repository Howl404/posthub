import { Component, inject, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Notification } from '../../../shared/models/notification';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { NotificationsService } from '../../../shared/services/notifications.service';

@Component({
  selector: 'app-notification[user][list]',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() list!: Notification[];

  @Input() user!: User;

  isDropdownOpen = false;

  userService = inject(UserService);

  notificationsService = inject(NotificationsService);

  router = inject(Router);

  user$ = this.userService.user$;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onNotificationClick(user: User, notification: Notification): void {
    this.notificationsService.removeNotification(user.id, notification);
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
