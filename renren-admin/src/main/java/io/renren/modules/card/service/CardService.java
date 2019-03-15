package io.renren.modules.card.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.card.entity.CardEntity;

import java.util.Map;

/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-14 08:11:02
 */
public interface CardService extends IService<CardEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

