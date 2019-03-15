package io.renren.modules.card.controller;

import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.card.entity.CardEntity;
import io.renren.modules.card.service.CardService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-14 08:11:02
 */
@RestController
@RequestMapping("sys/card")
public class CardController {
    @Autowired
    private CardService cardService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:card:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = cardService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{cardId}")
    @RequiresPermissions("sys:card:info")
    public R info(@PathVariable("cardId") String cardId){
        CardEntity card = cardService.getById(cardId);

        return R.ok().put("card", card);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:card:save")
    public R save(@RequestBody CardEntity card){
        cardService.save(card);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:card:update")
    public R update(@RequestBody CardEntity card){
        ValidatorUtils.validateEntity(card);
        cardService.updateById(card);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:card:delete")
    public R delete(@RequestBody String[] cardIds){
        cardService.removeByIds(Arrays.asList(cardIds));

        return R.ok();
    }

}
