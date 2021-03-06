/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core'
import { NsGoal, BtnGoalsService } from '@ws-widget/collection'
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material'
import { TFetchStatus } from '@ws-widget/utils'

@Component({
  selector: 'ws-app-goal-reject-dialog',
  templateUrl: './goal-reject-dialog.component.html',
  styleUrls: ['./goal-reject-dialog.component.scss'],
})
export class GoalRejectDialogComponent implements OnInit {
  @ViewChild('errorReject', { static: true }) errorRejectMessage!: ElementRef<
    any
  >
  @ViewChild('successReject', { static: true })
  successRejectMessage!: ElementRef<any>

  rejectMessage: string | null = null
  rejectGoalStatus: TFetchStatus = 'none'

  constructor(
    private snackbar: MatSnackBar,
    private goalSvc: BtnGoalsService,
    private dialogRef: MatDialogRef<GoalRejectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public goal: NsGoal.IGoal,
  ) {}

  ngOnInit() {}

  rejectGoal() {
    if (this.goal && this.rejectMessage && this.rejectMessage.length) {
      this.rejectGoalStatus = 'fetching'
      this.goalSvc
        .acceptRejectGoal(
          'reject',
          this.goal.type,
          this.goal.id,
          this.goal.sharedBy ? this.goal.sharedBy.userId : '',
          this.rejectMessage,
        )
        .subscribe(
          () => {
            this.rejectGoalStatus = 'done'
            this.snackbar.open(this.successRejectMessage.nativeElement.value)
            this.dialogRef.close(true)
          },
          () => {
            this.rejectGoalStatus = 'error'
            this.snackbar.open(this.errorRejectMessage.nativeElement.value)
          },
        )
    }
  }
}
