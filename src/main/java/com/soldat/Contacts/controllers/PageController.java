package com.soldat.Contacts.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Ihor Soldatenko
 * @date 28.06.2022
 */

@Controller
public class PageController {

    @GetMapping("/about")
    public String about(){
        return "about";
    }
}
