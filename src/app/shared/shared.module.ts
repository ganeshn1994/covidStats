import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InputRestrictionDirective } from '../directives/number.directive';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { MdxTableComponent } from './mdx-table/mdx-table.component';
import { MdxPaginationComponent } from './mdx-pagination/mdx-pagination.component';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes';
import { StyleCellDirective } from '../directives/style-cell.directive';
import { CurrencyPipe } from '@angular/common';
import { HeadingDirective } from '../directives/heading.directive';
import { RequiredDirective } from '../directives/required.directive';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DragDropDirective } from '../directives/drag-drop-directive.directive';
import { MatchHeightDirective } from '../directives/match-height.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipModule } from 'ng2-tooltip-directive';
import { PopoverModule } from 'ngx-smart-popover';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    InputRestrictionDirective,
    StyleCellDirective,
    HeadingDirective,
    RequiredDirective,
    DragDropDirective,
    MatchHeightDirective,
    TabsComponent,
    MdxTableComponent,
    MdxPaginationComponent,
    ModalComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    RouterModule,
    ChartsModule,
    PipesModule,
    NgbModule,
    AngularEditorModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule,
    NgbDatepickerModule,
    FileUploadModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    NgbDatepickerModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TooltipModule,
    PopoverModule,
    ClipboardModule
  ],
  exports: [
    InputRestrictionDirective,
    StyleCellDirective,
    RequiredDirective,
    HeadingDirective,
    StyleCellDirective,
    RequiredDirective,
    HeadingDirective,
    DragDropDirective,
    MatchHeightDirective,

    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    ChartsModule,
    PipesModule,
    NgbModule,
    NgbDatepickerModule,
    AngularEditorModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule,
    FileUploadModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TooltipModule,
    PopoverModule,
    ClipboardModule,

    TabsComponent,
    MdxTableComponent,
    MdxPaginationComponent,
    ModalComponent,
  ],
  providers: [CurrencyPipe, DatePipe]
})
export class SharedModule {}
