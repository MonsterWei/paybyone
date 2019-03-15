package io.renren.modules.card.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.card.entity.CardTypeEntity;

import java.util.Map;

/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-14 08:11:02
 */
public interface CardTypeService extends IService<CardTypeEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

