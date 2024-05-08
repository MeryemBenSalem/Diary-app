package com.mydiary.Diaries.DiaryService;

import com.mydiary.Diaries.Model.Diary;
import com.mydiary.Diaries.Repository.DiaryRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;

    @Autowired
    public DiaryService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    public Diary getDiaryEntryById(ObjectId id) {
        return diaryRepository.findById(id).blockOptional().orElse(null);
    }

    public Mono<Diary> updateDiaryEntry(ObjectId id, Diary updatedDiary) {
        updatedDiary.setId(id);
        return diaryRepository.save(updatedDiary);
    }

    public void deleteDiaryEntry(ObjectId id) {
        diaryRepository.deleteById(id);
    }
}
