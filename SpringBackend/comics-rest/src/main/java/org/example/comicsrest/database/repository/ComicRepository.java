package org.example.comicsrest.database.repository;

import org.example.comicsrest.database.entity.Comic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComicRepository extends MongoRepository<Comic, String> {

    @Query("{ $or: [{ 'title': { $regex: '?0', $options: 'i' } }, { 'author': { $regex: '?0', $options: 'i' } }, { 'publisher': { $regex: '?0', $options: 'i' } }, {'genres': { $regex: '?0', $options: 'i'}} ] }")
    List<Comic> findComicsByTitleOrAuthorOrPublisherOrGenres(String keyword);

    @Query("{'genres' : :#{#key} }")
    List<Comic> findComicsByGenre(@Param("key") String keyword);
}
