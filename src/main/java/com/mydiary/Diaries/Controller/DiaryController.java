package com.mydiary.Diaries.Controller;

import com.mydiary.Diaries.Repository.DiaryRepository;
import com.mydiary.Diaries.Model.Diary;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diary")
public class DiaryController {

    @Autowired
    private DiaryRepository diaryRepository;

    // Get all diary entries
    @GetMapping
    public List<Diary> getAllDiaryEntries() {
        return diaryRepository.findAll();
    }

    // Create a new diary entry
    @PostMapping
    public Diary createDiaryEntry(@RequestBody Diary diary) {
        return diaryRepository.save(diary);
    }

    // Get a diary entry by ID
    @GetMapping("/{id}")
    public Diary getDiaryEntryById(@PathVariable("id") ObjectId id) {
        return diaryRepository.findById(id).orElse(null);
    }

    // Update a diary entry
    @PutMapping("/{id}")
    public Diary updateDiaryEntry(@PathVariable("id") ObjectId id, @RequestBody Diary updatedDiary) {
        updatedDiary.setId(id);
        return diaryRepository.save(updatedDiary);
    }

    // Delete a diary entry
    @DeleteMapping("/{id}")
    public void deleteDiaryEntry(@PathVariable("id") ObjectId id) {
        diaryRepository.deleteById(id);
    }
}
