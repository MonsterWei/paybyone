package io.renren.modules.card.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.card.dao.AgentDao;
import io.renren.modules.card.entity.AgentEntity;
import io.renren.modules.card.service.AgentService;


@Service("agentService")
public class AgentServiceImpl extends ServiceImpl<AgentDao, AgentEntity> implements AgentService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<AgentEntity> page = this.page(
                new Query<AgentEntity>().getPage(params),
                new QueryWrapper<AgentEntity>()
        );

        return new PageUtils(page);
    }

}
