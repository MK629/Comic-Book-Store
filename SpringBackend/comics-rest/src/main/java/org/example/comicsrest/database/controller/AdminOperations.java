package org.example.comicsrest.database.controller;

import org.example.comicsrest.database.service.ComicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adminOps")
public class AdminOperations {

    private final ComicService comicService;

    @Autowired
    public AdminOperations(ComicService comicService) {
        this.comicService = comicService;
    }

    @GetMapping("/test")
    public String testPrivileges() {
        return "admin privileges";
    }

    @GetMapping("/findById/{id}")
    public ComicService.ComicRecord findOne(@PathVariable("id") String id){
        return comicService.findById(id);
    }

    @GetMapping("/findAllComics")
    public List<ComicService.ComicRecord> findAllComics(){
        return comicService.findAll();
    }

    @DeleteMapping("/deleteAll")
    public String deleteAll(){
        comicService.deleteAll();
        return "success";
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteOne(@PathVariable("id") String id){
        comicService.deleteById(id);
        return "success";
    }

    @PostMapping("/saveNew")
    public String saveNew(@RequestBody ComicService.ComicRecord comicRecord){
        comicService.save(comicRecord);
        return "success";
    }

    @PostMapping("/editComic")
    public String editComic(@RequestBody ComicService.ComicRecord comicRecord){
        return comicService.editComic(comicRecord);
    }

    @GetMapping("/completeOrder/{orderId}")
    public String completeOrder(@PathVariable("orderId") String orderId){
        return comicService.completeOrder(orderId);
    }

    @GetMapping("/findAllOrders")
    public List<ComicService.OrderRecord> findAllOrders(){
        return comicService.findAllOrders();
    }

    @GetMapping("/findAllOngoingOrders")
    public List<ComicService.OrderRecord> findAllOngoingOrders(){
        return comicService.findAllOngoingOrders();
    }

    @GetMapping("/findAllCompletedOrders")
    public List<ComicService.OrderRecord> findAllCompletedOrders(){
        return comicService.findAllCompletedOrders();
    }

    @GetMapping("findAllCancelledOrders")
    public List<ComicService.OrderRecord> findAllCancelledOrders(){
        return comicService.findAllCancelledOrders();
    }
}
