package org.example.comicsrest.database.repository;

import org.example.comicsrest.database.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    @Query("{$and: [{'username':  ?0}, {'deliveryStatus': 'Ongoing'}]}")
    List<Order> findByUsernameAndOngoing(String username);

    @Query("{$and: [{'username':  ?0}, {'deliveryStatus': 'Completed'}]}")
    List<Order> findByUsernameAndCompleted(String username);

    @Query("{$and: [{'username':  ?0}, {'deliveryStatus': 'Cancelled'}]}")
    List<Order> findByUsernameAndCancelled(String username);

    @Query("{'username': ?0}")
    List<Order> findAllByUsername(String username);

    @Query("{'deliveryStatus': 'Ongoing'}")
    List<Order> findAllOngoing();

    @Query("{'deliveryStatus': 'Completed'}")
    List<Order> findAllCompleted();

    @Query("{'deliveryStatus': 'Cancelled'}")
    List<Order> findAllCancelled();
}
