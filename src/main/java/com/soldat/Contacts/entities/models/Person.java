package com.soldat.Contacts.entities.models;

import com.soldat.Contacts.entities.EmailEntity;
import com.soldat.Contacts.entities.PersonEntity;
import com.soldat.Contacts.entities.PhoneNumberEntity;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */


public class Person {

    private long id;
    private String name;
    private String note;
    private List<PhoneNumber> phoneNumbers;
    private List<Email> emails;

    public Person() {
    }

    public static Person toModel(PersonEntity personEntity){
        Person person = new Person();
        person.setId(personEntity.getId());
        person.setName(personEntity.getName());
        person.setNote(personEntity.getNote());
        if(personEntity.getPhoneNumbers()!=null)person.setPhoneNumbers(PhoneNumber.toModelList(personEntity.getPhoneNumbers()));
        if(personEntity.getEmails()!=null)person.setEmails(Email.toModelList(personEntity.getEmails()));
        return person;
    }

    public static List<Person> toModelList(List<PersonEntity> personEntities){
        return personEntities.stream().map(Person::toModel).collect(Collectors.toList());
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

    public List<PhoneNumber> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(List<PhoneNumber> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

    public List<Email> getEmails() {
        return emails;
    }

    public void setEmails(List<Email> emails) {
        this.emails = emails;
    }
}
