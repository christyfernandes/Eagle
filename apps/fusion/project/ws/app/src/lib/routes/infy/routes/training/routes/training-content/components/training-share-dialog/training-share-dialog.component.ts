/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material'

import { NsAutoComplete } from '@ws-widget/collection'
import { TSendStatus } from '@ws-widget/utils'

import { ITraining } from '../../../../models/training-api.model'
import { TrainingApiService } from '../../../../apis/training-api.service'

@Component({
  selector: 'ws-app-training-share-dialog',
  templateUrl: './training-share-dialog.component.html',
  styleUrls: ['./training-share-dialog.component.scss'],
})
export class TrainingShareDialogComponent {
  users: NsAutoComplete.IUserAutoComplete[]
  sendStatus: TSendStatus

  constructor(
    @Inject(MAT_DIALOG_DATA) public training: ITraining,
    private dialogRef: MatDialogRef<TrainingShareDialogComponent>,
    private trainingApi: TrainingApiService,
  ) {
    this.users = []
    this.sendStatus = 'none'
  }

  updateUsers(usersList: NsAutoComplete.IUserAutoComplete[]) {
    this.users = usersList
  }

  onBtnShareClick() {
    this.sendStatus = 'sending'
    this.trainingApi.shareTraining(this.training.offering_id, this.users).subscribe(
      () => {
        this.sendStatus = 'done'
        this.dialogRef.close()
      },
      () => {
        this.sendStatus = 'error'
      },
    )
  }
}
