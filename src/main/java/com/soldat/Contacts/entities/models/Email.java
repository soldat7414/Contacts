package com.soldat.Contacts.entities.models;

import com.soldat.Contacts.entities.PersonEntity;
import com.soldat.Contacts.entities.EmailEntity;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

public class Email {
    private long id;
    private String email;

    public Email() {
    }

    public static Email toModel (EmailEntity emailEntity){
        Email email = new Email();
        email.setId(emailEntity.getId());
        email.setEmail(emailEntity.getEmail());
        return email;
    }

    public static List<Email> toModelList (List<EmailEntity> emailEntities){
        return emailEntities.stream().map(Email::toModel).collect(Collectors.toList());
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
