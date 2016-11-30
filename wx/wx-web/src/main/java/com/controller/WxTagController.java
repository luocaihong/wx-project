package com.controller;

import com.model.PagerParam;
import com.models.web.BaseResp;
import com.models.web.DataListResp;
import com.models.web.tag.AddTagReq;
import com.models.web.tag.WxTagInfo;
import com.service.web.TagService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

/**
 * Created by admin on 2016/11/30.
 */
@Controller
@RequestMapping("wxtag")
public class WxTagController {

    @Resource
    TagService tagService;

    @RequestMapping("index.html")
    public ModelAndView index() {
        ModelAndView view = new ModelAndView("tag/index");
        return view;
    }

    @ResponseBody
    @RequestMapping(value = "getTagList", method = RequestMethod.POST)
    public DataListResp getTagList(PagerParam data) {
        return tagService.getTagList(data.getPageSize(), data.getPageIndex(), data.getDomain(), data.getArgs());
    }

    @ResponseBody
    @RequestMapping(value = "addTag", method = RequestMethod.POST)
    public BaseResp addTag(AddTagReq data) {
        return tagService.addTag(data);
    }

    @ResponseBody
    @RequestMapping(value = "getWxTag",method= RequestMethod.POST)
    public WxTagInfo getWxTag(@RequestParam("tagId") Integer tagId) {
        return tagService.getTag(tagId);
    }

    @ResponseBody
    @RequestMapping(value = "deleteTag", method = RequestMethod.POST)
    public BaseResp deleteTag() {
        return null;
    }
}