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

@Table("assessment_by_content_user")
public class UserAssessmentByContentUserModel {

	@PrimaryKey
	private UserAssessmentByContentUserPrimaryKeyModel primaryKey;

	@Column("correct_count")
	private Integer correctCount;
	@Column("incorrect_count")
	private Integer incorrectCount;
	@Column("not_answered_count")
	private Integer notAnsweredCount;
	@Column("pass_percent")
	private BigDecimal passPercent;
	@Column("source_id")
	private String sourceId;
	@Column("source_title")
	private String sourceTitle;

	public UserAssessmentByContentUserModel(UserAssessmentByContentUserPrimaryKeyModel primaryKey, Integer correctCount,
			Integer incorrectCount, Integer notAnsweredCount, BigDecimal passPercent, String sourceId,
			String sourceTitle) {
		super();
		this.primaryKey = primaryKey;
		this.correctCount = correctCount;
		this.incorrectCount = incorrectCount;
		this.notAnsweredCount = notAnsweredCount;
		this.passPercent = passPercent;
		this.sourceId = sourceId;
		this.sourceTitle = sourceTitle;
	}

	public UserAssessmentByContentUserModel() {
		super();
	}

	public UserAssessmentByContentUserPrimaryKeyModel getPrimaryKey() {
		return primaryKey;
	}

	public void setPrimaryKey(UserAssessmentByContentUserPrimaryKeyModel primaryKey) {
		this.primaryKey = primaryKey;
	}

	public Integer getCorrectCount() {
		return correctCount;
	}

	public void setCorrectCount(Integer correctCount) {
		this.correctCount = correctCount;
	}

	public Integer getIncorrectCount() {
		return incorrectCount;
	}

	public void setIncorrectCount(Integer incorrectCount) {
		this.incorrectCount = incorrectCount;
	}

	public Integer getNotAnsweredCount() {
		return notAnsweredCount;
	}

	public void setNotAnsweredCount(Integer notAnsweredCount) {
		this.notAnsweredCount = notAnsweredCount;
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

	@Override
	public String toString() {
		return "UserAssessmentByContentUserModel [primaryKey=" + primaryKey + ", correctCount=" + correctCount
				+ ", incorrectCount=" + incorrectCount + ", notAnsweredCount=" + notAnsweredCount + ", passPercent="
				+ passPercent + ", sourceId=" + sourceId + ", sourceTitle=" + sourceTitle + "]";
	}

}
