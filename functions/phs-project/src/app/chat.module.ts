import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {ChatDialogComponent} from './chat-dialog.component'

@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
    exports: [ChatDialogComponent],
    declarations: [ChatDialogComponent]
})
export class ChatModule {}