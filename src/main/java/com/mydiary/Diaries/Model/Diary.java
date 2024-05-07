package com.mydiary.Diaries.Model;


import java.time.LocalDateTime;

import jakarta.persistence.Id;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "diaries")
public class Diary {
    @Id
    private ObjectId id;
    private String title;
    private LocalDateTime date;
    private String content;
    private int user_id;

    public Diary(String title, LocalDateTime date, String content, int user_id) {
        this.title = title;

        this.date = date;
        this.content = content;
        this.user_id = user_id;
    }

    // Getters and setters
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
    
