/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import {
  IWsChannelsConfig,
  IWsChannelTabDetails,
  IWsChannelTabContent,
} from '../../models/channels.model'

@Component({
  selector: 'ws-app-channels-resolver',
  templateUrl: './channels-resolver.component.html',
  styleUrls: ['./channels-resolver.component.scss'],
})
export class ChannelsResolverComponent implements OnInit {
  channelsConfig: IWsChannelsConfig | null = null
  errorFetchingJson = false
  selectedIndex = 0
  tabs: IWsChannelTabDetails[] = []
  tabData: IWsChannelTabContent | null = null

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const parentRoute = this.route.parent
    if (parentRoute) {
      parentRoute.data.subscribe(response => {
        if (response.channelsData.data) {
          this.channelsConfig = response.channelsData.data
          this.getDetails()
        } else if (response.channelsData.error) {
          this.errorFetchingJson = true
        }
      })
    }
  }

  getDetails() {
    const channelsConfig = this.channelsConfig
    if (channelsConfig) {
      this.tabs = channelsConfig.tabs.map(tab => tab.tabDetails)
      this.route.paramMap.subscribe((params: ParamMap) => {
        const tabKey = params.get('tab') ? params.get('tab') : this.tabs[0].key
        if (tabKey) {
          const index = channelsConfig.tabs.map(tab => tab.tabDetails.key).indexOf(tabKey)
          this.tabData = channelsConfig.tabs[index].tabContent
        }
      })
    }
  }
}
