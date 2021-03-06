/*               "Copyright 2020 Infosys Ltd.
               Use of this source code is governed by GPL v3 license that can be found in the LICENSE file or at https://opensource.org/licenses/GPL-3.0
               This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3" */
substitute url based on requirement

import java.util.Date;

import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("content_source_user_registration")
public class ContentSourceUserRegistration {

	@PrimaryKey
	private ContentSourceUserRegistrationKey key;

	public ContentSourceUserRegistrationKey getKey() {
		return key;
	}

	public void setKey(ContentSourceUserRegistrationKey key) {
		this.key = key;
	}

	@Column("start_date")
	private Date startDate;

	@Column("end_date")
	private Date endDate;

	@Column("started_on")
	private Date startedOn;

	
	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public ContentSourceUserRegistration(ContentSourceUserRegistrationKey contentKey, Date startDate, Date endDate,
			Date startedOn) {
		super();
		this.key = contentKey;
		this.startDate = startDate;
		this.endDate = endDate;
		this.startedOn = startedOn;
	}

	public Date getStartedOn() {
		return startedOn;
	}

	public void setStartedOn(Date startedOn) {
		this.startedOn = startedOn;
	}

	public ContentSourceUserRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}

}
