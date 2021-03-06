/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core'
import { NsGoal, BtnGoalsService } from '@ws-widget/collection'
import { TFetchStatus, EventService } from '@ws-widget/utils'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'ws-app-goal-common-card',
  templateUrl: './goal-common-card.component.html',
  styleUrls: ['./goal-common-card.component.scss'],
})
export class GoalCommonCardComponent implements OnInit {
  @ViewChild('createGoalError', { static: true })
  createGoalErrorMessage!: ElementRef<any>
  @ViewChild('createGoalSuccess', { static: true })
  createGoalSuccessMessage!: ElementRef<any>

  EGoalTypes = NsGoal.EGoalTypes
  @Input() goal: NsGoal.IGoal | null = null
  @Output() goalCreated = new EventEmitter()
  isExpanded = false

  duration = 1
  type: NsGoal.EGoalTypes = NsGoal.EGoalTypes.USER_COMMON

  createGoalStatus: TFetchStatus = 'none'
  constructor(
    private events: EventService,
    private goalSvc: BtnGoalsService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    if (this.goal) {
      this.goal.duration = (this.goal.contents || [])
        .map(content => content.duration)
        .reduce((total: number, current: number) => total + current, 0)

      this.type = this.goal.createdForSelf
        ? NsGoal.EGoalTypes.FOR_OTHERS_COMMON
        : NsGoal.EGoalTypes.USER_COMMON
    }
  }

  createCommonGoal() {
    if (this.goal) {
      this.createGoalStatus = 'fetching'
      this.goalSvc
        .createGoal({
          id: this.goal.id,
          type: this.type,
          duration: this.duration,
          name: this.goal.name,
          contentIds: this.goal.contentIds,
          description: this.goal.description,
        })
        .subscribe(
          () => {
            this.createGoalStatus = 'done'
            this.goalCreated.emit()
            this.snackBar.open(
              this.createGoalSuccessMessage.nativeElement.value,
            )
            if (this.type === NsGoal.EGoalTypes.USER_COMMON) {
              this.router.navigate(['/app/goals/me'])
            } else {
              this.router.navigate(['/app/goals/others'])
            }
          },
          () => {
            this.createGoalStatus = 'error'
            this.snackBar.open(this.createGoalErrorMessage.nativeElement.value)
          },
        )
    }
  }

  raiseTelemetry() {
    this.events.raiseInteractTelemetry('goal', 'create', {
      goalType: this.type,
    })
  }
}
