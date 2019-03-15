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
@TableName("tb_order")
public class OrderEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private String orderId;
	/**
	 * 
	 */
	private String orderNumber;
	/**
	 * 
	 */
	private Integer orderAgentId;
	/**
	 * 
	 */
	private String orderStatus;
	/**
	 * 
	 */
	private Double orderMoney;
	/**
	 * 
	 */
	private String orderPayway;
	/**
	 * 
	 */
	private Double orderPayMoney;
	/**
	 * 
	 */
	private Date orderPayDate;
	/**
	 * 
	 */
	private Double orderExchange;
	/**
	 * 
	 */
	private Date orderCreatetime;
	/**
	 * 
	 */
	private Date orderModifytime;
	/**
	 * 
	 */
	private String orderCreateby;
	/**
	 * 
	 */
	private String orderModifyby;
	/**
	 * 
	 */
	private String orderDeleteFlag;

}
