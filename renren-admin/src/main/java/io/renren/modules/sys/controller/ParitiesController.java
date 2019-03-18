package io.renren.modules.sys.controller;

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

import io.renren.modules.sys.entity.ParitiesEntity;
import io.renren.modules.sys.service.ParitiesService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-18 11:39:10
 */
@RestController
@RequestMapping("sys/parities")
public class ParitiesController {
    @Autowired
    private ParitiesService paritiesService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:parities:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = paritiesService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{paritiesId}")
    @RequiresPermissions("sys:parities:info")
    public R info(@PathVariable("paritiesId") Integer paritiesId){
        ParitiesEntity parities = paritiesService.getById(paritiesId);

        return R.ok().put("parities", parities);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:parities:save")
    public R save(@RequestBody ParitiesEntity parities){
        paritiesService.save(parities);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:parities:update")
    public R update(@RequestBody ParitiesEntity parities){
        ValidatorUtils.validateEntity(parities);
        paritiesService.updateById(parities);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:parities:delete")
    public R delete(@RequestBody Integer[] paritiesIds){
        paritiesService.removeByIds(Arrays.asList(paritiesIds));

        return R.ok();
    }

}
