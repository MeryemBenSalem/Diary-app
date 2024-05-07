package com.mydiary.Diaries.Repository;

import com.mydiary.Diaries.Model.Diary;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends MongoRepository<Diary, ObjectId> {

}
