package io.renren.modules.card.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.card.dao.ParitiesDao;
import io.renren.modules.card.entity.ParitiesEntity;
import io.renren.modules.card.service.ParitiesService;


@Service("paritiesService")
public class ParitiesServiceImpl extends ServiceImpl<ParitiesDao, ParitiesEntity> implements ParitiesService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<ParitiesEntity> page = this.page(
                new Query<ParitiesEntity>().getPage(params),
                new QueryWrapper<ParitiesEntity>()
        );

        return new PageUtils(page);
    }

}
