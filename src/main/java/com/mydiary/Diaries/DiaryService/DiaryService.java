package com.mydiary.Diaries.DiaryService;

import com.mydiary.Diaries.Model.Diary;
import com.mydiary.Diaries.Repository.DiaryRepository;
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

    public List<Diary> getAllDiaryEntries() {
        return diaryRepository.findAll();
    }

    public Diary getDiaryEntryById(ObjectId id) {
        return diaryRepository.findById(id).orElse(null);
    }

    public Diary createDiaryEntry(Diary diary) {
        return diaryRepository.save(diary);
    }

    public Diary updateDiaryEntry(ObjectId id, Diary updatedDiary) {
        updatedDiary.setId(id);
        return diaryRepository.save(updatedDiary);
    }

    public void deleteDiaryEntry(ObjectId id) {
        diaryRepository.deleteById(id);
    }
}
