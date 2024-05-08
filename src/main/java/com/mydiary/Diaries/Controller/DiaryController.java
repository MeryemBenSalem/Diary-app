package com.mydiary.Diaries.Controller;

import com.mydiary.Diaries.Repository.DiaryRepository;
import com.mydiary.Diaries.Model.Diary;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/diary")
public class DiaryController {

    @Autowired
    private DiaryRepository diaryRepository;

    // Get all diary entries
    @GetMapping
    public Flux<Diary> getAllDiaryEntries() {
        return diaryRepository.findAll();
    }

    // Create a new diary entry
    @PostMapping
    public Mono<Diary> createDiaryEntry(@RequestBody Mono<Diary> diaryMono) {
        return diaryMono.flatMap(diaryRepository::save);
    }


    // Get a diary entry by ID
    @GetMapping("/{id}")
    public Mono<Diary> getDiaryEntryById(@PathVariable("id") String id) {
        ObjectId objectId = new ObjectId(id); // Convert id to ObjectId
        return diaryRepository.findById(objectId);
    }

    // Update a diary entry
    @PutMapping("/{id}")
    public Mono<Diary> updateDiaryEntry(@PathVariable("id") String id, @RequestBody Mono<Diary> updatedDiaryMono) {
        return updatedDiaryMono.flatMap(updatedDiary -> {
            ObjectId objectId = new ObjectId(id);
            updatedDiary.setId(objectId);
            return diaryRepository.save(updatedDiary);
        });
    }


    // Delete a diary entry
    @DeleteMapping("/{id}")
    public Mono<Void> deleteDiaryEntry(@PathVariable("id") ObjectId id) {
        return diaryRepository.deleteById(id);
    }
}
