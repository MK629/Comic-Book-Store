package org.example.comicsrest.database.service;

import org.example.comicsrest.database.entity.Comic;
import org.example.comicsrest.database.entity.Order;

import org.example.comicsrest.database.enums.DeliveryStatus;
import org.example.comicsrest.database.enums.Genres;
import org.example.comicsrest.database.repository.ComicRepository;
import org.example.comicsrest.database.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComicService {

    private final ComicRepository comicRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public ComicService(ComicRepository comicRepository, OrderRepository orderRepository) {
        this.comicRepository = comicRepository;
        this.orderRepository = orderRepository;
    }


    public record ComicRecord(
            String id,
            String title,
            String description,
            String author,
            String publisher,
            LocalDate publishedDate,
            String cover,
            Double price,
            Integer issues,
            List<Genres> genres
    ){}

    public record OrderRecord(
            String id,
            String username,
            List<ComicOrder> orderedComics,
            Double totalPrice,
            LocalDate orderDate,
            LocalDate deliveryDate,
            String deliveryAddress,
            String phoneNumber,
            DeliveryStatus deliveryStatus
    ){}

    public record ComicOrder(
            String id,
            String title,
            String cover,
            Integer issueNumber,
            Integer quantity,
            Double price
    ){}

    public record OrderReceiver(
            String username,
            List<ComicOrder> orderedComics,
            Double totalPrice,
            String deliveryAddress,
            String phoneNumber
    ){}


    //Service Methods//

    //Comic//
    public List<ComicRecord> findHot(){
        List<Comic> hotComics = new ArrayList<>();
        List<Comic> allComics = comicRepository.findAll();
        hotComics.add(allComics.get(2));
        hotComics.add(allComics.get(8));
        hotComics.add(allComics.get(10));
        hotComics.add(allComics.get(13));
        hotComics.add(allComics.get(14));
        hotComics.add(allComics.get(15));
        hotComics.add(allComics.get(19));
        hotComics.add(allComics.get(20));
        return hotComics.stream().map(comic -> {return returnComicRecord(comic);}).collect(Collectors.toList());
    }

    public List<ComicRecord> findAll() {
        return comicRepository.findAll().stream().map((result) -> {return returnComicRecord(result);}).collect(Collectors.toList());
    }

    public ComicRecord findById(String id) {
        Comic foundComic = comicRepository.findById(id).orElse(null);
        return returnComicRecord(foundComic);
    }

    public List<ComicRecord> findByAny(String keyword){
        return comicRepository.findComicsByTitleOrAuthorOrPublisherOrGenres(keyword).stream().map((result) -> {return returnComicRecord(result);}).collect(Collectors.toList());
    }

    @Transactional
    public void save(ComicRecord comicRecord) {
        Comic newComic = returnComic(comicRecord);
        comicRepository.save(newComic);
    }

    @Transactional
    public String editComic(ComicRecord comicRecord) {
        Comic editComic = comicRepository.findById(comicRecord.id).orElse(null);
        if (editComic == null) {
            return "not found.";
        }
        editComic.setTitle(comicRecord.title);
        editComic.setDescription(comicRecord.description);
        editComic.setAuthor(comicRecord.author);
        editComic.setPublisher(comicRecord.publisher);
        editComic.setPublishedDate(comicRecord.publishedDate);
        editComic.setCover(comicRecord.cover);
        editComic.setPrice(comicRecord.price);
        editComic.setIssues(comicRecord.issues);
        editComic.setGenres(comicRecord.genres);
        comicRepository.save(editComic);
        return "success";
    }

    public void deleteAll(){
        comicRepository.deleteAll();
    }

    public void deleteById(String id) {
        comicRepository.deleteById(id);
    }

    //Order//
    @Transactional
    public OrderRecord placeOrder(OrderReceiver orderReceiver) {
        if(orderReceiver.deliveryAddress.isEmpty() || orderReceiver.phoneNumber.isEmpty()
            || orderReceiver.deliveryAddress.isBlank() || orderReceiver.phoneNumber.isBlank()
            || orderReceiver.deliveryAddress == null || orderReceiver.phoneNumber == null){
            return null;
        }
        Order order = new Order(orderReceiver.username, orderReceiver.orderedComics, orderReceiver.totalPrice, LocalDate.now(), orderReceiver.deliveryAddress, orderReceiver.phoneNumber, DeliveryStatus.Ongoing);
        orderRepository.save(order);
        return returnOrderRecord(order);
    }

    public List<OrderRecord> findAllUserOrders(String username){
        return orderRepository.findAllByUsername(username).stream().map((result) -> {return returnOrderRecord(result);}).collect(Collectors.toList());
    }

    public List<OrderRecord> findUserOngoingOrders(String username) {
        return orderRepository.findByUsernameAndOngoing(username).stream().map((order -> {return returnOrderRecord(order);})).collect(Collectors.toList());
    }

    public List<OrderRecord> findUserCompletedOrders(String username) {
        return orderRepository.findByUsernameAndCompleted(username).stream().map((order -> {return returnOrderRecord(order);})).collect(Collectors.toList());
    }

    public List<OrderRecord> findUserCancelledOrders(String username) {
        return orderRepository.findByUsernameAndCancelled(username).stream().map((order -> {return returnOrderRecord(order);})).collect(Collectors.toList());
    }

    @Transactional
    public String cancelOrder(String id) {
        Order orderToCancel = orderRepository.findById(id).orElse(null);
        if(orderToCancel != null && LocalDate.now().isBefore(orderToCancel.getOrderDate().plusDays(1)) && orderToCancel.getDeliveryStatus() == DeliveryStatus.Ongoing){
            orderToCancel.setDeliveryStatus(DeliveryStatus.Cancelled);
            orderRepository.save(orderToCancel);
            return "success";
        }
        return "failed";
    }

    @Transactional
    public String completeOrder(String id){
        Order orderToComplete = orderRepository.findById(id).orElse(null);
        if(orderToComplete != null){
            orderToComplete.setDeliveryStatus(DeliveryStatus.Completed);
            orderRepository.save(orderToComplete);
            return "success";
        }
        return "failed";
    }

    public List<OrderRecord> findAllOrders(){
        return orderRepository.findAll().stream().map((order) -> {return returnOrderRecord(order);}).collect(Collectors.toList());
    }

    public List<OrderRecord> findAllOngoingOrders(){
        return orderRepository.findAllOngoing().stream().map((order) -> {return returnOrderRecord(order);}).collect(Collectors.toList());
    }

    public List<OrderRecord> findAllCompletedOrders(){
        return orderRepository.findAllCompleted().stream().map((order) -> {return returnOrderRecord(order);}).collect(Collectors.toList());
    }

    public List<OrderRecord> findAllCancelledOrders(){
        return orderRepository.findAllCancelled().stream().map((order) -> {return returnOrderRecord(order);}).collect(Collectors.toList());
    }


    //UtilityMethods

    private ComicRecord returnComicRecord(Comic comic) {
        return new ComicRecord(comic.getId(), comic.getTitle(), comic.getDescription(), comic.getAuthor(), comic.getPublisher(), comic.getPublishedDate(), comic.getCover(), comic.getPrice(), comic.getIssues(), comic.getGenres());
    }

    private Comic returnComic(ComicRecord comicRecord){
        return new Comic(comicRecord.title, comicRecord.description, comicRecord.author, comicRecord.publisher, comicRecord.publishedDate, comicRecord.cover, comicRecord.price, comicRecord.issues, comicRecord.genres);
    }

    private OrderRecord returnOrderRecord(Order order) {
        return new OrderRecord(order.getOrderId(), order.getUsername(), order.getOrderedComics(), order.getTotalPrice(), order.getOrderDate(), order.getDeliveryDate(), order.getDeliveryAddress(), order.getPhoneNumber(), order.getDeliveryStatus());
    }
}
