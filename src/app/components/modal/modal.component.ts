import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { ModalService } from 'src/app/components/modal/modal.service';

@Component({
  selector: 'app-modal[id]',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: string;

  @Output() closed = new EventEmitter<void>();

  isOpen = false;

  private element: HTMLElement = this.el.nativeElement;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.modalService.add(this);
    document.body.appendChild(this.element);
  }

  handleOverlayClick(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (element.className === 'modal-overlay') {
      this.close();
    }
  }

  open(): void {
    document.body.classList.add('modal-open');
    this.isOpen = true;
  }

  close(): void {
    document.body.classList.remove('modal-open');
    this.isOpen = false;
    this.closed.emit();
  }

  ngOnDestroy(): void {
    this.modalService.remove(this);
    this.element.remove();
    this.closed.emit();
  }
}