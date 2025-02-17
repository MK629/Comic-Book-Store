package org.example.comicsrest.database.entity;

import org.example.comicsrest.database.enums.DeliveryStatus;
import org.example.comicsrest.database.service.ComicService;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;


@Document
public class Order {

    @Id
    private String orderId;
    private String username;
    private List<ComicService.ComicOrder> orderedComics;
    private Double totalPrice;
    private LocalDate orderDate;
    private LocalDate deliveryDate;
    private String deliveryAddress;
    private String phoneNumber;
    private DeliveryStatus deliveryStatus;

    public Order() {}

    public Order(String username, List<ComicService.ComicOrder> orderedComics, Double totalPrice, LocalDate orderDate, String deliveryAddress, String phoneNumber, DeliveryStatus deliveryStatus) {
        this.username = username;
        this.orderedComics = orderedComics;
        this.totalPrice = totalPrice;
        this.orderDate = orderDate;
        this.deliveryDate = orderDate.plusDays(3);
        this.deliveryAddress = deliveryAddress;
        this.phoneNumber = phoneNumber;
        this.deliveryStatus = deliveryStatus;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<ComicService.ComicOrder> getOrderedComics() {
        return orderedComics;
    }

    public void setOrderedComics(List<ComicService.ComicOrder> orderedComics) {
        this.orderedComics = orderedComics;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public DeliveryStatus getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(DeliveryStatus deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId='" + orderId + '\'' +
                ", username='" + username + '\'' +
                ", orderedComics=" + orderedComics +
                ", totalPrice=" + totalPrice +
                ", deliveryAddress='" + deliveryAddress + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", deliveryStatus=" + deliveryStatus +
                '}';
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}
