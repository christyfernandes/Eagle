/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
/**
© 2017 - 2019 Infosys Limited, Bangalore, India. All Rights Reserved. 
Version: 1.10

Except for any free or open source software components embedded in this Infosys proprietary software program (“Program”),
this Program is protected by copyright laws, international treaties and other pending or existing intellectual property rights in India,
the United States and other countries. Except as expressly permitted, any unauthorized reproduction, storage, transmission in any form or
by any means (including without limitation electronic, mechanical, printing, photocopying, recording or otherwise), or any distribution of 
this Program, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible
under the law.

Highly Confidential
 
*/
substitute url based on requirement

import java.math.BigDecimal;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("user_assessment_top_performer")
public class UserAssessmentTopPerformerModel {

	@PrimaryKey
	private UserAssessmentTopPerformerPrimaryKeyModel primaryKey;
	@Column("pass_percent")
	private BigDecimal passPercent;
	@Column("source_id")
	private String sourceId;
	@Column("source_title")
	private String sourceTitle;
	@Column("user_id")
	private String userId;

	public UserAssessmentTopPerformerPrimaryKeyModel getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(UserAssessmentTopPerformerPrimaryKeyModel primaryKey) {
		this.primaryKey = primaryKey;
	}

	public BigDecimal getPassPercent() {
		return passPercent;
	}

	public void setPassPercent(BigDecimal passPercent) {
		this.passPercent = passPercent;
	}

	public String getSourceId() {
		return sourceId;
	}

	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}

	public String getSourceTitle() {
		return sourceTitle;
	}

	public void setSourceTitle(String sourceTitle) {
		this.sourceTitle = sourceTitle;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public UserAssessmentTopPerformerModel(UserAssessmentTopPerformerPrimaryKeyModel primaryKey, BigDecimal passPercent,
			String sourceId, String sourceTitle, String userId) {
		super();
		this.primaryKey = primaryKey;
		this.passPercent = passPercent;
		this.sourceId = sourceId;
		this.sourceTitle = sourceTitle;
		this.userId = userId;
	}

	public UserAssessmentTopPerformerModel() {
		super();
	}

	@Override
	public String toString() {
		return "UserAssessmentTopPerformerModel [primaryKey=" + primaryKey + ", passPercent=" + passPercent
				+ ", sourceId=" + sourceId + ", sourceTitle=" + sourceTitle + ", userId=" + userId + "]";
	}

}