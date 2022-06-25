package com.soldat.Contacts.entities;

import com.soldat.Contacts.entities.models.Person;

import javax.persistence.*;
import java.util.List;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */

@Entity
public class PersonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String note;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "personEntity")
    private List<PhoneNumberEntity> phoneNumbers;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "personEntity")
    private List<EmailEntity> emails;

    public PersonEntity() {
    }

    public Person toModel (){
        return Person.toModel(this);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public List<PhoneNumberEntity> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(List<PhoneNumberEntity> phoneNumberEntities) {
        this.phoneNumbers = phoneNumberEntities;
    }

    public List<EmailEntity> getEmails() {
        return emails;
    }

    public void setEmails(List<EmailEntity> emailEntities) {
        this.emails = emailEntities;
    }
}
