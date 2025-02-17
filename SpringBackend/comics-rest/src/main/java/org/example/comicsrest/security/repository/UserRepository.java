package org.example.comicsrest.security.repository;

import org.example.comicsrest.security.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{'username':  ?0}")
    Optional<User> findByUsername(String username);

    @Query("{'email': ?0}")
    Optional<User> findByEmail(String email);

    @Query("{ $or:  [{'username' : ?0}, {'email' :  ?0}]}")
    Optional<User> findByUsernameOrEmail(String usernameOrEmail);

    @Query("{ $or:  [{'username' : ?0}, {'email' :  ?0}]}")
    User simpleFindByUsernameOrEmail(String usernameOrEmail);
}
