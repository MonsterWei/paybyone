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
@TableName("tb_card")
public class CardEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private String cardId;
	/**
	 * 
	 */
	private String cardNumber;
	/**
	 * 
	 */
	private String cardAgentId;
	/**
	 * 
	 */
	private Integer cardTypeId;
	/**
	 * 
	 */
	private Date cardDueDate;
	/**
	 * 
	 */
	private String cardStatus;
	/**
	 * 
	 */
	private Date cardOrderCreatetime;
	/**
	 * 
	 */
	private Date cardOrderModifytime;
	/**
	 * 
	 */
	private Date cardCreatecardTime;

}
