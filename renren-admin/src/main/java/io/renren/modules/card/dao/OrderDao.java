package io.renren.modules.card.dao;

import io.renren.modules.card.entity.OrderEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-14 08:11:02
 */
@Mapper
public interface OrderDao extends BaseMapper<OrderEntity> {
	
}
