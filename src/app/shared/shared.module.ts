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
import { ControlMessageComponent } from './control-message/control-message.component';
import { InputComponent } from './input/input.component';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DateComponent } from './date/date.component';
import { SelectComponent } from './select/select.component';
import { ModalComponent } from './modal/modal.component';
import { FilterComponent } from './filter/filter.component';
import { TexteditorComponent } from './texteditor/texteditor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DragDropDirective } from '../directives/drag-drop-directive.directive';
import { UploadComponent } from './upload/upload.component';
import { MatchHeightDirective } from '../directives/match-height.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MdxImgUploadComponent } from './mdx-img-upload/mdx-img-upload.component';
import { BusinessHeaderComponent } from './business-header/business-header.component';
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
import { DealCardComponent } from './deal-card/deal-card.component';

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
    ControlMessageComponent,
    InputComponent,
    DateComponent,
    SelectComponent,
    ModalComponent,
    FilterComponent,
    TexteditorComponent,
    UploadComponent,
    MdxImgUploadComponent,
    BusinessHeaderComponent,
    DealCardComponent
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
    InputComponent,
    DateComponent,
    SelectComponent,
    ControlMessageComponent,
    ModalComponent,
    ControlMessageComponent,
    FilterComponent,
    TexteditorComponent,
    UploadComponent,
    MdxImgUploadComponent,
    BusinessHeaderComponent,
    DealCardComponent
  ],
  providers: [CurrencyPipe, DatePipe]
})
export class SharedModule {}
