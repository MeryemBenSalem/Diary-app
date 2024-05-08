package com.mydiary.Diaries.Repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import com.mydiary.Diaries.Model.Diary;

import reactor.core.publisher.Flux;

import org.bson.types.ObjectId; // Add this import statement

public interface DiaryRepository extends ReactiveMongoRepository<Diary, ObjectId> { // Change the second parameter type to ObjectId
    Flux<Diary> findAll();
}
