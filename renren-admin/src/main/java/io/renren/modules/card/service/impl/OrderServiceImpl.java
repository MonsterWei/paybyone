package io.renren.modules.card.service.impl;

import io.renren.common.utils.Constant;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.card.dao.OrderDao;
import io.renren.modules.card.entity.OrderEntity;
import io.renren.modules.card.service.OrderService;


@Service("orderService")
public class OrderServiceImpl extends ServiceImpl<OrderDao, OrderEntity> implements OrderService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String orderNumber = (String) params.get("orderNumber");
        String orderStatus = (String) params.get("orderStatus");


        if (orderStatus!=null){
            if(orderStatus.equals("0")){
                orderStatus="";
            }
        }


        IPage<OrderEntity> page = this.page(
                new Query<OrderEntity>().getPage(params),
                new QueryWrapper<OrderEntity>()
                .like(StringUtils.isNotBlank(orderNumber),"order_number",orderNumber)
                .like(StringUtils.isNotBlank(orderStatus),"order_status",orderStatus)
                .apply(params.get(Constant.SQL_FILTER) != null, (String)params.get(Constant.SQL_FILTER))
        );
        return new PageUtils(page);
    }

}
