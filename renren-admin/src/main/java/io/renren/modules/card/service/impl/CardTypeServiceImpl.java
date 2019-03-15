package io.renren.modules.card.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.card.dao.CardTypeDao;
import io.renren.modules.card.entity.CardTypeEntity;
import io.renren.modules.card.service.CardTypeService;


@Service("cardTypeService")
public class CardTypeServiceImpl extends ServiceImpl<CardTypeDao, CardTypeEntity> implements CardTypeService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<CardTypeEntity> page = this.page(
                new Query<CardTypeEntity>().getPage(params),
                new QueryWrapper<CardTypeEntity>()
        );

        return new PageUtils(page);
    }

}
