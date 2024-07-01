import { Injectable } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ModalComponent[] = [];

  add(modal: ModalComponent): void {
    if (this.modals.find((x) => x.id === modal.id)) {
      throw new Error('modal must have a unique id attribute');
    }

    this.modals.push(modal);
  }

  remove(modal: ModalComponent): void {
    this.modals = this.modals.filter((x) => x === modal);
  }

  open(id: string): void {
    const modal = this.modals.find((x) => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.open();
  }

  close(id: string): void {
    const modal = this.modals.find((x) => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.close();
  }
}
