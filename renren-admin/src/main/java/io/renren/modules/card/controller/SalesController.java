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

import io.renren.modules.card.entity.SalesEntity;
import io.renren.modules.card.service.SalesService;
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
@RequestMapping("sys/sales")
public class SalesController {
    @Autowired
    private SalesService salesService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sales:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = salesService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{salesNumber}")
    @RequiresPermissions("sys:sales:info")
    public R info(@PathVariable("salesNumber") String salesNumber){
        SalesEntity sales = salesService.getById(salesNumber);

        return R.ok().put("sales", sales);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sales:save")
    public R save(@RequestBody SalesEntity sales){
        salesService.save(sales);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sales:update")
    public R update(@RequestBody SalesEntity sales){
        ValidatorUtils.validateEntity(sales);
        salesService.updateById(sales);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sales:delete")
    public R delete(@RequestBody String[] salesNumbers){
        salesService.removeByIds(Arrays.asList(salesNumbers));

        return R.ok();
    }

}
