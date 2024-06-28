import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ModalComponent[] = [];

  find(id: string): ModalComponent | undefined {
    return this.modals.find((modal) => modal.id === id);
  }

  add(modal: ModalComponent): void {
    if (this.find(modal.id)) {
      throw new Error('modal must have a unique id attribute');
    }

    this.modals.push(modal);
  }

  remove(modal: ModalComponent): void {
    this.modals = this.modals.filter((x) => x !== modal);
  }

  open(id: string): void {
    const modal = this.find(id);

    this.modals.forEach((item) => item.close());

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.open();
  }

  close(id: string): void {
    const modal = this.find(id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.close();
  }
}
