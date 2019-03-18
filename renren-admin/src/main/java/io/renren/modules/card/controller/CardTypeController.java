package io.renren.modules.card.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.qiniu.util.Json;
import io.renren.common.utils.WriterUtil;
import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.card.entity.CardTypeEntity;
import io.renren.modules.card.service.CardTypeService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2019-03-14 08:11:02
 */
@RestController
@RequestMapping("sys/cardtype")
public class CardTypeController {
    @Autowired
    private CardTypeService cardTypeService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:cardtype:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = cardTypeService.queryPage(params);

        System.out.println(page.getList());
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{cardTypeId}")
    @RequiresPermissions("sys:cardtype:info")
    public R info(@PathVariable("cardTypeId") Integer cardTypeId){
        CardTypeEntity cardType = cardTypeService.getById(cardTypeId);

        return R.ok().put("cardType", cardType);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:cardtype:save")
    public R save(@RequestBody CardTypeEntity cardType){
        cardTypeService.save(cardType);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:cardtype:update")
    public R update(@RequestBody CardTypeEntity cardType){
        ValidatorUtils.validateEntity(cardType);
        cardTypeService.updateById(cardType);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:cardtype:delete")
    public R delete(@RequestBody Integer[] cardTypeIds){
        cardTypeService.removeByIds(Arrays.asList(cardTypeIds));

        return R.ok();
    }
    @RequestMapping("/findType")
    @RequiresPermissions("sys:cardtype:findType")
    public void findType(HttpServletRequest request,HttpServletResponse response) throws IOException {

        JSONObject result = new JSONObject();
        List<CardTypeEntity> list = cardTypeService.list();
        if (list!=null){

            result.put("success",true);
            result.put("cardTypeList",list);
        }else {
            result.put("msg","查询错误");
        }

        WriterUtil.write(response, result.toString());
    }


}
