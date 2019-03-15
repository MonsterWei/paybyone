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

import io.renren.modules.card.entity.ManagerEntity;
import io.renren.modules.card.service.ManagerService;
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
@RequestMapping("sys/manager")
public class ManagerController {
    @Autowired
    private ManagerService managerService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:manager:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = managerService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{managerId}")
    @RequiresPermissions("sys:manager:info")
    public R info(@PathVariable("managerId") Integer managerId){
        ManagerEntity manager = managerService.getById(managerId);

        return R.ok().put("manager", manager);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:manager:save")
    public R save(@RequestBody ManagerEntity manager){
        managerService.save(manager);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:manager:update")
    public R update(@RequestBody ManagerEntity manager){
        ValidatorUtils.validateEntity(manager);
        managerService.updateById(manager);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:manager:delete")
    public R delete(@RequestBody Integer[] managerIds){
        managerService.removeByIds(Arrays.asList(managerIds));

        return R.ok();
    }

}
