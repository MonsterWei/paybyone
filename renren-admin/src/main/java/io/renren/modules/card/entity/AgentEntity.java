package io.renren.modules.card.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-14 08:11:02
 */
@Data
@TableName("tb_agent")
public class AgentEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer agentId;
	/**
	 * 
	 */
	private String agentName;
	/**
	 * 
	 */
	private Double agentDiscount;
	/**
	 * 
	 */
	private Double agentChangemoney;
	/**
	 * 
	 */
	private Double agentSolemoney;
	/**
	 * 
	 */
	private String agentStatus;
	/**
	 * 
	 */
	private String agentLinkman;
	/**
	 * 
	 */
	private String agentPassword;
	/**
	 * 
	 */
	private String agentPhone;
	/**
	 * 
	 */
	private String agentEmail;
	/**
	 * 
	 */
	private String agentAddress;
	/**
	 * 
	 */
	private Date agentCreatetime;
	/**
	 * 
	 */
	private Date agentModifytime;

}
