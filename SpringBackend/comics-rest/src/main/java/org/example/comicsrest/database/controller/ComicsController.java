package org.example.comicsrest.database.controller;

import lombok.RequiredArgsConstructor;
import org.example.comicsrest.database.entity.Comic;
import org.example.comicsrest.database.service.ComicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/comics")
public class ComicsController {

    private final ComicService comicService;

    @Autowired
    public ComicsController(ComicService comicService) {
        this.comicService = comicService;
    }

    @GetMapping("/test")
    public String hello(){
        return "comic test";
    }

    @GetMapping("/findHot")
    public List<ComicService.ComicRecord> findHot(){
        return comicService.findHot();
    }

    @GetMapping("/findAll")
    public List<ComicService.ComicRecord> findAll(){
        return comicService.findAll();
    }

    @GetMapping("/findById/{id}")
    public ComicService.ComicRecord findOne(@PathVariable("id") String id){
        return comicService.findById(id);
    }

    @GetMapping("/findByAny/{keyword}")
    public List<ComicService.ComicRecord> findByAny(@PathVariable("keyword") String keyword){
        return comicService.findByAny(keyword);
    }

    @PostMapping("/order")
    public ComicService.OrderRecord order(@RequestBody ComicService.OrderReceiver orderReceiver){
        return comicService.placeOrder(orderReceiver);
    }

    @GetMapping("/findAllOrders/{username}")
    public List<ComicService.OrderRecord> findAllUserOrders(@PathVariable("username") String username){
        return comicService.findAllUserOrders(username);
    }

    @GetMapping("/findOngoingOrders/{username}")
    public List<ComicService.OrderRecord> findUserOngoingOrders(@PathVariable("username") String username){
        return comicService.findUserOngoingOrders(username);
    }

    @GetMapping("/findCompletedOrders/{username}")
    public List<ComicService.OrderRecord> findUserCompletedOrders(@PathVariable("username") String username){
        return comicService.findUserCompletedOrders(username);
    }

    @GetMapping("/findCancelledOrders/{username}")
    public List<ComicService.OrderRecord> findUserCancelledOrders(@PathVariable("username") String username){
        return comicService.findUserCancelledOrders(username);
    }

    @GetMapping("/cancelOrder/{orderId}")
    public String cancelOrder(@PathVariable("orderId") String orderId){
        return comicService.cancelOrder(orderId);
    }
}
